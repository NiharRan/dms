<?php


namespace App\Repositories;


use App\DriverInvoice;
use App\Services\InvoiceService;
use App\Traits\RepositoryTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DriverInvoiceRepository
{
  use RepositoryTrait;

  private $driverInvoice;
  protected $guarded = [];

  public function __construct(DriverInvoice $driverInvoice)
  {
    $this->driverInvoice = $driverInvoice;
  }

  public function all()
  {
    $driverInvoices = $this->driverInvoice
      ->with(['client', 'product']);

    if (\request()->has('status') && !empty(request()->status)) {
      $driverInvoices = $driverInvoices->where('status', \request()->status);
    }

    if (\request()->has('start_date') && !empty(request()->start_date)) {
      $start_date = \request()->start_date . ' 00:00:00';
      $end_date = \request()->end_date . ' 23:59:59';
      $driverInvoices = $driverInvoices->whereBetween('created_at', [$start_date, $end_date]);
    }

    if (\request()->has('invoice') && !empty(request()->invoice)) {
      $driverInvoices = $driverInvoices->where('invoice', \request()->invoice);
    }

    if (\request()->has('client') && !empty(\request()->client)) {
      $client = \request()->client;
      $driverInvoices = $driverInvoices->where('client_id', $client);
    }

    if (\request()->has('product') && !empty(\request()->product)) {
      $product = \request()->product;
      $driverInvoices = $driverInvoices->where('product_id', $product);
    }

    if (\request()->has('search') && !empty(\request()->search)) {
      $search = \request()->search;
      $driverInvoices = $driverInvoices->where('driver_name', 'like', "%$search")
        ->orWhere('track_no', 'like', "%$search")
        ->orWhere('driver_phone', 'like', "%$search");
    }
    return $driverInvoices->orderBy('id', 'desc');
  }

  public function findById($rowId)
  {
    return $this->driverInvoice->with([
      'client',
      'product',
      'company',
      'creator'
    ])->find($rowId);
  }

  public function findByInvoice(string $invoice)
  {
    return $this->driverInvoice->with([
      'company',
      'client',
      'creator',
      'product'
    ])->where('invoice', $invoice)->first();
  }

  public function store(Request $request)
  {
    $driverInvoice = new DriverInvoice;
    $driverInvoice = $this->setupData($driverInvoice, $request);
    $driverInvoice->invoice = InvoiceService::driver();
    $driverInvoice->created_at = date('Y-m-d H:i:s');
    $driverInvoice->user_id = Auth::id();
    if ($driverInvoice->save()) {
      return $driverInvoice;
    }
    return null;
  }

  public function update(Request $request, $id)
  {
    $driverInvoice = $this->findById($id);
    $driverInvoice = $this->setupData($driverInvoice, $request);
    $driverInvoice->user_id = Auth::id();
    if ($driverInvoice->save()) {
      return $driverInvoice;
    }
    return null;
  }

  private function setupData(DriverInvoice $driverInvoice, $request)
  {
    $driverInvoice->product_id = $request->product_id;
    $driverInvoice->quantity = $request->quantity;
    $driverInvoice->scale = $request->scale;
    $driverInvoice->amount = $request->amount;
    $driverInvoice->track_rent = $request->track_rent;
    $driverInvoice->others = $request->others;
    $driverInvoice->total = $request->total;
    $driverInvoice->paid = $request->paid;
    $driverInvoice->due = $request->due;
    $driverInvoice->company_id = $request->company_id;
    $driverInvoice->client_id = $request->client_id;
    $driverInvoice->driver_name = $request->driver_name;
    $driverInvoice->track_no = $request->track_no;
    $driverInvoice->driver_phone = $request->driver_phone;

    if(intval($request->due) == 0) {
      $driverInvoice->status = 1;
    }
    return $driverInvoice;
  }
}
