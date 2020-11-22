<?php

namespace App\Http\Controllers;

use App\Company;
use App\DriverInvoice;
use App\Http\Requests\DriverInvoiceRequest;
use App\Http\Resources\DriverInvoiceResource;
use App\Repositories\DriverInvoiceRepository;
use App\Settings\Client;
use App\Settings\Load;
use App\Settings\MeasurementType;
use App\Settings\Product;
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
    $driverInvoices = DriverInvoiceResource::collection($this->driverInvoiceRepository->paginate(request()->per_page));
    $clients = Client::active()->orderBy('name', 'asc')->get();
    $products = Product::active()->orderBy('name', 'asc')->get();
    $measurementTypes = MeasurementType::active()->orderBy('name', 'asc')->get();
    return Inertia::render('Invoice/Driver/Index', [
      'breadcrumbs' => $breadcrumbs,
      'driver_invoices' => $driverInvoices,
      'clients' => $clients,
      'products' => $products,
      'measurement_types' => $measurementTypes,
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
    $load = Load::orderBy('id', 'desc')->active()->first();
    $measurementTypes = MeasurementType::active()->orderBy('name', 'asc')->get();
    return Inertia::render('Invoice/Driver/Create', [
      'breadcrumbs' => $breadcrumbs,
      'clients' => $clients,
      'products' => $products,
      'load' => $load,
      'measurement_types' => $measurementTypes,
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
    $load = Load::orderBy('id', 'desc')->active()->first();
    $measurementTypes = MeasurementType::active()->orderBy('name', 'asc')->get();
    return Inertia::render('Invoice/Driver/Edit', [
      'breadcrumbs' => $breadcrumbs,
      'clients' => $clients,
      'products' => $products,
      'load' => $load,
      'driver_invoice' => $driver_invoice,
      'measurement_types' => $measurementTypes,
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

  public function commissions($referenceCode)
  {
    $commissions = DriverInvoice::where('reference', '=', $referenceCode)->get()->sum('commission');
    return response()->json(['commission' => $commissions]);
  }
}
