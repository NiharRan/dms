<?php

namespace App\Http\Controllers;

use App\Company;
use Inertia\Inertia;
use App\Http\Requests\SaleRequest;
use App\Http\Resources\SaleResource;
use App\Repositories\SaleRepository;
use App\Settings\Client;
use App\Settings\Stock;
use App\Settings\TransactionMedia;
use Illuminate\Http\Response;

class SaleController extends Controller
{
  protected $saleRepository;
  public function __construct(SaleRepository $saleRepository)
  {
    $this->saleRepository = $saleRepository;
  }

  /**
   * Display a listing of the resource.
   *
   * @return Response
   */
  public function index()
  {
    $pageConfigs = [
      'pageHeader' => true
    ];
    $breadcrumbs = [
      ['link' => "/", 'name' => __('Home')],
      ['name' => __("Sales")],
    ];
    $clients = Client::orderBy('name', 'asc')->get();
    $sales = request()->has('per_page') ? SaleResource::collection($this->saleRepository->paginate(request()->per_page)) : null;
    return Inertia::render('Sale/Index', [
      'breadcrumbs' => $breadcrumbs,
      'sales' => $sales,
      'clients' => $clients,
      'has_modal' => false,
      'link' => route('sales.create')
    ]);
  }

  /**
   * Display a listing of the resource.
   *
   * @return Response
   */
  public function print()
  {
    $company = Company::active()->orderBy('id', 'desc')->first();
    $sales = $this->saleRepository->all()->get();
    return Inertia::render('Sale/PrintList', [
      'sales' => $sales,
      'company' => $company,
    ]);
  }

  public function create()
  {
    $pageConfigs = [
      'pageHeader' => true
    ];
    $breadcrumbs = [
      ['link' => "/", 'name' => __('Home')],
      ['link' => route('sales.index'), 'name' => __("Sales")],
      ['name' => __('New Sale')]
    ];
    $clients = Client::active()->get();
    $stocks = Stock::active()->get();
    $transactionMedias = TransactionMedia::active()->get();
    $company = Company::active()->first();
    return Inertia::render('Sale/Create', [
      'breadcrumbs' => $breadcrumbs,
      'clients' => $clients,
      'transaction_medias' => $transactionMedias,
      'stocks' => $stocks,
      'company' => $company,
      'has_modal' => false,
      'link' => route('sales.index')
    ]);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param SaleRequest $request
   * @return Response
   */
  public function store(SaleRequest $request)
  {
    $sale = $this->saleRepository->store($request);
    if ($sale) {
      return redirect()
        ->route('sales.invoices.show', $sale->invoice)
        ->with('success', 'Sale invoice created successfully!');
    }
  }
  public function edit($id)
  {
    $pageConfigs = [
      'pageHeader' => true
    ];
    $breadcrumbs = [
      ['link' => "/", 'name' => __('Home')],
      ['link' => route('sales.index'), 'name' => __("Sales")],
      ['name' => __('Edit Sale')]
    ];
    $sale = $this->saleRepository->findById($id);
    $clients = Client::active()->get();
    $stocks = Stock::active()->get();
    $transactionMedias = TransactionMedia::active()->get();
    $company = Company::active()->first();
    return Inertia::render('Sale/Edit', [
      'breadcrumbs' => $breadcrumbs,
      'clients' => $clients,
      'transaction_medias' => $transactionMedias,
      'stocks' => $stocks,
      'company' => $company,
      'sale' => $sale,
      'has_modal' => false,
      'link' => route('sales.index')
    ]);
  }


  /**
   * Update the specified resource in storage.
   *
   * @param SaleRequest $request
   * @param int $id
   * @return Response
   */
  public function update(SaleRequest $request, $id)
  {
    $sale = $this->saleRepository->update($request, $id);

    if ($sale->save()) {
      return redirect()
        ->route('sales.index')
        ->with('success', "$sale->invoice's information updated successfully!");
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
