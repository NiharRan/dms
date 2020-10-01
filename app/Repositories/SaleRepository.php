<?php


namespace App\Repositories;


use App\Company;
use App\Sale;
use App\Services\SaleInvoiceService;
use App\Traits\RepositoryTrait;
use App\Users\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;

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

  public function findBySlug(string $slug)
  {
    return $this->sale->with(['client', 'sale_details'])
      ->where('slug', $slug)->first();
  }

  public function store(Request $request)
  {
    $sale = new Sale;
    $sale = $this->setupData($sale, $request);
    $sale->created_at = date('Y-m-d H:i:s');
    if ($sale->save()) {
      return $sale;
    }
    return null;
  }

  public function update(Request $request, $id)
  {
    $sale = $this->findById($id);
    $sale = $this->setupData($sale, $request);
    $sale->status = filter_var($request->status, FILTER_VALIDATE_BOOLEAN) ;
    $sale->creator = Auth::id();
    if ($sale->save()) {
      return $sale;
//      $sale->sale_details()->delete();
//      $this->storeSaleDetailsInfo($sale, $request);
    }
    return null;
  }

  private function setupData(Sale $sale, $request)
  {
    $sale->invoice = SaleInvoiceService::generate();
    $sale->total_price = $request->total_price;
    $sale->total_paid = $request->total_paid;
    $sale->total_due = $request->total_due;
    $sale->company_id = $request->company_id;
    $sale->client_id = $request->client_id;
    $sale->track_no = $request->track_no;
    $sale->dl_no = $request->dl_no;
    $sale->sale_date = $request->sale_date;

    return $sale;
  }

//  private function storeSaleDetailsInfo(Sale $sale, Request $request)
//  {
//
//  }
}
