<?php


namespace App\Repositories;

use App\DriverInvoice;
use App\Sale;
use App\Services\InvoiceService;
use App\Services\TransactionService;
use App\Settings\Client;
use App\Settings\StockDetails;
use App\Traits\RepositoryTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SaleRepository
{
  use RepositoryTrait;

  private $sale;
  protected $guarded = [];

  public function __construct(Sale $sale)
  {
    $this->sale = $sale;
  }

  public function all()
  {
    $sales = $this->sale->with(['client', 'company', 'creator', 'transaction_media']);

    if (\request()->has('status') && !empty(request()->status)) {
      $sales = $sales->where('status', \request()->status);
    }

    if (\request()->has('start_date') && !empty(request()->start_date)) {
      $start_date = \request()->start_date . ' 00:00:00';
      $end_date = \request()->end_date . ' 23:59:59';
      $sales = $sales->whereBetween('sale_date', [$start_date, $end_date]);
    }

    if (\request()->has('invoice') && !empty(request()->invoice)) {
      $sales = $sales->where('invoice', \request()->invoice);
    }

    if (\request()->has('client') && !empty(\request()->client)) {
      $client = \request()->client;
      $sales = $sales->where('client_id', $client);
    }

    if (\request()->has('search') && !empty(\request()->search)) {
      $search = \request()->search;
      $sales = $sales->where(function ($query) use ($search) {
        $query->whereHas('client', function ($q) use ($search) {
          $q->where('name', 'like', "%$search%");
        })
          ->orWhereHas('creator', function ($q) use ($search) {
            $q->where('name', 'like', "%$search%");
          });
      });
    }
    return $sales->orderBy('id', 'desc');
  }

  public function findById($rowId)
  {
    $sale = $this->sale->with([
      'client',
      'transaction_media',
      'company',
      'creator',
      'sale_details' => function ($q) {
        $q->with([
          'stock',
          'product'
        ]);
      }
    ])->find($rowId);

    if ($sale->sale_details->count() > 0) {
      foreach ($sale->sale_details as $key => $sale_detail) {
        $stock_detail = StockDetails::where([
          'stock_id' => $sale_detail->stock->id,
          'product_id' => $sale_detail->product->id,
        ])->first();
        $sale->sale_details[$key]->product->quantity = $stock_detail->quantity;
        $sale->sale_details[$key]->stock_alert = '';
      }
    }

    return $sale;
  }

  public function findByInvoice(string $invoice)
  {
    return $this->sale->with([
      'client',
      'company',
      'transaction_media',
      'creator',
      'sale_details' => function ($q) {
        $q->with(['stock', 'product']);
      },
    ])->where('invoice', $invoice)->first();
  }

  public function store(Request $request)
  {
    $sale = new Sale;
    $sale = $this->setupData($sale, $request);
    $sale->invoice = InvoiceService::sale();
    $sale->created_at = date('Y-m-d H:i:s');
    $sale->user_id = Auth::id();

    if ($request->total_paid < $request->total_price) {
      $sale = $this->paymentFromBalance($request, $sale);
    }

    if (!empty($request->reference)) {
      $this->checkReference($request->reference);
    }

    $sale->reference = $request->reference;
    if ($sale->save()) {
      $this->storeSaleDetailsInfo($sale, $request);

      if ($sale->total_paid != 0) {
        TransactionService::createFromSale($sale);
      }
      return $sale;
    }
    return null;
  }

  public function update(Request $request, $id)
  {
    $sale = $this->findById($id);
    $sale = $this->setupData($sale, $request);
    $sale->user_id = Auth::id();

    if ($request->total_paid < $request->total_price) {
      $sale = $this->paymentFromBalance($request, $sale);
    } elseif ($request->total_paid > $request->total_price) {
      if ($sale->is_paid_from_balance) {
        $sale = $this->restoreBalance($request, $sale);
      } else {
        $sale->total_paid = $request->total_price;
        $sale->total_due = $request->total_price - $request->total_paid;
      }
    }

    if ($request->reference != $sale->reference) {
      $this->uncheckReference($sale->reference);
      if (!empty($request->reference)) {
        $this->checkReference($request->reference);
      }
    }

    $sale->reference = $request->reference;
    if ($sale->save()) {
      // First increment stock by adding old sale stock data
      $saleDetails = $sale->sale_details()->get();
      foreach ($saleDetails as $saleDetail) {
        $stock_id = $saleDetail->stock_id;
        $product_id = $saleDetail->product_id;
        $quantity = $saleDetail->quantity;

        $this->increaseStock($stock_id, $product_id, $quantity);
      }

      // Then delete old sale details
      $sale->sale_details()->delete();
      // Now add updated sale info
      $this->storeSaleDetailsInfo($sale, $request);
      if ($sale->total_paid != 0) {
        TransactionService::updateFromSale($sale);
      }
      return $sale;
    }
    return null;
  }

  private function paymentFromBalance(Request $request, Sale $sale)
  {
    $total_price = $request->total_price;
    $total_due = $request->total_due == "" ? 0 : $request->total_due;
    $total_paid = $request->total_paid == "" ? 0 : $request->total_paid;
    $client = Client::find($request->client_id);
    if ($client->balance != '' && $client->balance > 0) {
      $balance_decrease = 0;
      if ($client->balance < $total_due) {
        $total_paid += $client->balance;
        $total_due -= $client->balance;

        $balance_decrease = $client->balance;
        $client->balance = 0;
      } else {
        $total_paid += $total_due;
        $balance_decrease = $total_due;
        $client->balance -= $total_due;
        $total_due = 0;
      }

      if ($client->save()) {
        $balance = number_format($balance_decrease, 2);
        $client->balance_histories()->create([
          'amount' => $balance_decrease,
          'description' => "$client->name, বিক্রয় রশিদ - $sale->invoice এর বিপরীতে আপনার হিসাব থেকে $balance টাকা খরচ হয়েছে",
          'type' => 'Out',
          'status' => 1,
          'created_at' => date('Y-m-d H:i:s')
        ]);
      }
      $sale->is_paid_from_balance = 1;
    }
    $sale->total_price = $total_price;
    $sale->total_paid = $total_paid;
    $sale->total_due = $total_due;

    return $sale;
  }

  private function restoreBalance(Request $request, Sale $sale)
  {
    $total_price = $request->total_price;
    $total_paid = $request->total_paid;

    $client = Client::find($request->client_id);
    $balance_increase = $total_paid - $total_price;
    $client->balance += $balance_increase;
    if ($client->save()) {
      $balance = number_format($balance_increase, 2);
      $client->balance_histories()->create([
        'amount' => $balance_increase,
        'description' => "বিক্রয় রশিদ - $sale->invoice এর বিপরীতে আপনার হিসাবে $balance টাকা যুক্ত হয়েছে",
        'type' => 'In',
        'status' => 1,
        'created_at' => date('Y-m-d H:i:s')
      ]);
    }
    $sale->total_price = $total_price;
    $sale->total_paid = $total_price;
    $sale->total_due = 0;

    return $sale;
  }


  private function setupData(Sale $sale, $request)
  {
    $sale->company_id = $request->company_id;
    $sale->client_id = $request->client_id;
    $sale->transaction_media_id = $request->transaction_media_id;
    $sale->description = strtoupper($request->description);
    $sale->sale_date = date('Y-m-d H:i:s', strtotime($request->sale_date));
    $sale->commission = $request->commission == '' ? 0 : $request->commission;

    if (intval($request->total_due) === 0) {
      $sale->status = 1;
    }

    return $sale;
  }

  private function storeSaleDetailsInfo(Sale $sale, $request)
  {
    foreach ($request->products as $key => $value) {
      if (!empty($value)) {
        $stock_id = $request->stocks[$key];
        $product_id = $request->products[$key];
        $quantity = $request->quantities[$key];
        $saleDetail = [
          'stock_id' => $stock_id,
          'product_id' => $product_id,
          'quantity' => $quantity,
          'price' => $request->prices[$key],
          'amount' => $request->totals[$key],
          'track_no' => strtoupper($request->tracks[$key]),
        ];
        $sale->sale_details()->create($saleDetail);
        $this->reduceStock($stock_id, $product_id, $quantity);
      }
    }
  }
  private function reduceStock($stock_id, $product_id, $quantity)
  {
    DB::table('stock_details')->where([
      'stock_id' => $stock_id,
      'product_id' => $product_id,
    ])->decrement('quantity', $quantity);
  }
  private function increaseStock($stock_id, $product_id, $quantity)
  {
    DB::table('stock_details')->where([
      'stock_id' => $stock_id,
      'product_id' => $product_id,
    ])->increment('quantity', $quantity);
  }

  private function checkReference($reference)
  {
    DriverInvoice::where('reference', $reference)->update([
      'is_commission_added' => 1
    ]);
  }

  private function uncheckReference($reference)
  {
    DriverInvoice::where('reference', $reference)->update([
      'is_commission_added' => 0
    ]);
  }
}
