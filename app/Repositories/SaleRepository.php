<?php


namespace App\Repositories;


use App\Sale;
use App\Services\InvoiceService;
use App\Services\TransactionService;
use App\Settings\StockDetails;
use App\Traits\RepositoryTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    $sales = $this->sale->with(['client', 'company', 'creator']);

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
      $sales = $sales->whereHas('client', function ($q) use($search)
      {
        $q->where('name', 'like', "%$search");
      });
    }
    return $sales->orderBy('id', 'desc');
  }

  public function findById($rowId)
  {
    return $this->sale->with([
      'client',
      'transaction_media',
      'company',
      'creator',
      'sale_details' => function ($q) {
        $q->with(['stock', 'product']);
      }
    ])->find($rowId);
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

  private function setupData(Sale $sale, $request)
  {
    $sale->total_price = $request->total_price == '' ? 0 : $request->total_price;
    $sale->total_paid = $request->total_paid == '' ? 0 : $request->total_paid;
    $sale->total_due = $request->total_due == '' ? 0 : $request->total_due;
    $sale->commission = $request->commission == '' ? 0 : $request->commission;
    $sale->company_id = $request->company_id;
    $sale->client_id = $request->client_id;
    $sale->transaction_media_id = $request->transaction_media_id;
    $sale->description = $request->description;
    $sale->sale_date = date('Y-m-d H:i:s', strtotime($request->sale_date));
    
    if(intval($request->total_due) === 0) {
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
          'track_no' => $request->tracks[$key],
        ];
        $sale->sale_details()->create($saleDetail);
        $this->reduceStock($stock_id, $product_id, $quantity);
      }
    }
  }
  private function reduceStock($stock_id, $product_id, $quantity)
  {
    StockDetails::where([
      'stock_id' => $stock_id,
      'product_id' => $product_id,
    ])->decrement('quantity', $quantity);
  }
  private function increaseStock($stock_id, $product_id, $quantity)
  {
    StockDetails::where([
      'stock_id' => $stock_id,
      'product_id' => $product_id,
    ])->increment('quantity', $quantity);
  }
}
