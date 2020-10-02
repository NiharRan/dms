<?php


namespace App\Repositories;


use App\Sale;
use App\Services\InvoiceService;
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
    $sales = $this->sale
      ->with(['client'])
      ->where('id', '!=', auth()->user()->id);

    if (\request()->has('status')) {
      $sales = $sales->where('status', \request()->status);
    }

    if (\request()->has('client') && !empty(\request()->client)) {
      $client = \request()->client;
      $sales = $sales->where('client_id', $client);
    }

    if (\request()->has('search') && !empty(\request()->search)) {
      $search = \request()->search;
      $sales = $sales->where('driver_name', 'like', "%$search")
        ->orWhere('track_no', 'like', "%$search")
        ->orWhere('dl_no', 'like', "%$search")
        ->orWhere('email', 'like', "%$search");
    }
    return $sales->orderBy('name', 'asc');
  }

  public function findById($rowId)
  {
    return $this->sale->with(['client', 'sale_details'])->find($rowId);
  }

  public function findByInvoice(string $invoice)
  {
    return $this->sale->with([
      'client',
      'creator',
      'sale_details' => function ($q) {
        $q->with('product');
      }
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
      return $sale;
    }
    return null;
  }

  public function update(Request $request, $id)
  {
    $sale = $this->findById($id);
    $sale = $this->setupData($sale, $request);
    $sale->status = filter_var($request->status, FILTER_VALIDATE_BOOLEAN) ;
    $sale->user_id = Auth::id();
    if ($sale->save()) {
      $sale->sale_details()->delete();
      $this->storeSaleDetailsInfo($sale, $request);
      return $sale;
    }
    return null;
  }

  private function setupData(Sale $sale, $request)
  {
    $sale->total_price = $request->total_price;
    $sale->total_paid = $request->total_paid;
    $sale->total_due = $request->total_due;
    $sale->company_id = $request->company_id;
    $sale->client_id = $request->client_id;
    $sale->driver_name = $request->driver_name;
    $sale->track_no = $request->track_no;
    $sale->dl_no = $request->dl_no;
    $sale->sale_date = date('Y-m-d H:i:s', strtotime($request->sale_date));

    return $sale;
  }

  private function storeSaleDetailsInfo(Sale $sale, $request)
  {
    foreach ($request->products as $key => $value) {
      if (!empty($value)) {
        $saleDetail = [
          'product_id' => $request->products[$key],
          'quantity' => $request->quantities[$key],
          'price' => $request->prices[$key],
          'amount' => $request->totals[$key],
        ];
        $sale->sale_details()->create($saleDetail);
      }
    }
  }
}
