<?php

namespace App\Http\Controllers;

use App\Company;
use App\Http\Requests\DriverInvoiceRequest;
use App\Repositories\DriverInvoiceRepository;
use App\Settings\Client;
use App\Settings\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class DriverInvoiceController extends Controller
{
  protected $driverInvoiceRepository;
  public function __construct(DriverInvoiceRepository $driverInvoiceRepository)
  {
    $this->driverInvoiceRepository = $driverInvoiceRepository;
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Inertia\Response
   */
  public function index()
  {
    $pageConfigs = [
      'pageHeader' => true
    ];
    $breadcrumbs = [
      ['link'=>"/",'name'=> __('Home')],
      ['name'=> __("Driver Invoices") ],
    ];
    $driverInvoices = $this->driverInvoiceRepository->paginate(request()->per_page);
    $clients = Client::orderBy('name', 'asc')->get();
    $products = Product::orderBy('name', 'asc')->get();
    return Inertia::render('Invoice/Driver/Index', [
      'breadcrumbs' => $breadcrumbs,
      'driver_invoices' => $driverInvoices,
      'clients' => $clients,
      'products' => $products,
      'has_modal' => false,
      'link' => route('drivers.invoices.create')
    ]);
  }

  public function create()
  {
    $pageConfigs = [
      'pageHeader' => true
    ];
    $breadcrumbs = [
      ['link'=>"/",'name'=> __('Home')],
      ['link'=> route('drivers.invoices.index'), 'name'=> __("Driver Invoices") ],
      ['name' => __('New Driver Invoice')]
    ];
    $clients = Client::active()->get();
    $products = Product::active()->get();
    $company = Company::active()->first();
    return Inertia::render('Invoice/Driver/Create', [
      'breadcrumbs' => $breadcrumbs,
      'clients' => $clients,
      'products' => $products,
      'company' => $company,
      'has_modal' => false,
      'link' => route('drivers.invoices.index')
    ]);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param DriverInvoiceRequest $request
   * @return Response
   */
  public function store(DriverInvoiceRequest $request)
  {
    $driverInvoice = $this->driverInvoiceRepository->store($request);
    if ($driverInvoice) {
      return redirect()
        ->route('drivers.invoices.show', $driverInvoice->invoice)
        ->with('success', 'Driver invoice created successfully!');
    }
  }

  public function show($invoice)
  {
    $driverInvoice = $this->driverInvoiceRepository->findByInvoice($invoice);
    $pageConfigs = [
      'pageHeader' => true
    ];
    $breadcrumbs = [
      ['link'=>"/",'name'=> __('Home')],
      ['link'=> route('drivers.invoices.index'), 'name'=> __("Driver Invoices") ],
      ['name' => __("Invoice: $driverInvoice->invoice")]
    ];

    return Inertia::render('Invoice/Driver/Invoice', [
      'driver_invoice' => $driverInvoice,
      'breadcrumbs' => $breadcrumbs,
      'link' => route('drivers.invoices.index')
    ]);
  }

  public function print($invoice)
  {
    $driverInvoice = $this->driverInvoiceRepository->findByInvoice($invoice);
    return Inertia::render('Invoice/Driver/Print', [
      'driver_invoice' => $driverInvoice,
    ]);
  }

  public function pay($invoice)
  {
    $driverInvoice = $this->driverInvoiceRepository->findByInvoice($invoice);
    $driverInvoice->paid = $driverInvoice->total;
    $driverInvoice->due = 0.00;
    $driverInvoice->status = 1;
    if ($driverInvoice->save()) {
      return redirect()->back()->with('success', 'Invoice payment done!');
    }
  }

  public function edit($id)
  {
    $driver_invoice = $this->driverInvoiceRepository->findById($id);
    $pageConfigs = [
      'pageHeader' => true
    ];
    $breadcrumbs = [
      ['link'=>"/",'name'=> __('Home')],
      ['link'=> route('drivers.invoices.index'), 'name'=> __("Driver Invoices") ],
      ['name' => __('New Driver Invoice')]
    ];
    $clients = Client::active()->get();
    $products = Product::active()->get();
    return Inertia::render('Invoice/Driver/Edit', [
      'breadcrumbs' => $breadcrumbs,
      'clients' => $clients,
      'products' => $products,
      'driver_invoice' => $driver_invoice,
      'has_modal' => false,
      'link' => route('drivers.invoices.index')
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param DriverInvoiceRequest $request
   * @param int $id
   * @return Response
   */
  public function update(DriverInvoiceRequest $request, $id)
  {
    $driverInvoice = $this->driverInvoiceRepository->update($request, $id);

    if ($driverInvoice->save()) {
      return redirect()
        ->route('drivers.invoices.show', $driverInvoice->invoice)
        ->with('success', "$driverInvoice->invoice's information updated successfully!");
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function destroy($id)
  {
    //
  }
}
