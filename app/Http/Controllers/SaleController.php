<?php

namespace App\Http\Controllers;

use App\Company;
use Inertia\Inertia;
use App\Http\Requests\SaleRequest;
use App\Repositories\SaleRepository;
use App\Settings\Client;
use App\Settings\Product;
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
        ['link'=>"/",'name'=> __('Home')],
        ['name'=> __("Sales") ],
      ];
      $sales = $this->saleRepository->paginate(request()->per_page);

      return Inertia::render('Sale/Index', [
        'breadcrumbs' => $breadcrumbs,
        'sales' => $sales,
        'has_modal' => false,
        'link' => route('sales.create')
      ]);
    }

    public function create()
    {
      $pageConfigs = [
        'pageHeader' => true
      ];
      $breadcrumbs = [
        ['link'=>"/",'name'=> __('Home')],
        ['link'=> route('sales.index'), 'name'=> __("Sales") ],
        ['name' => __('New Sale')]
      ];
      $clients = Client::active()->get();
      $products = Product::active()->get();
      $company = Company::active()->first();
      return Inertia::render('Sale/Create', [
        'breadcrumbs' => $breadcrumbs,
        'clients' => $clients,
        'products' => $products,
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
        ->route('sales.invoice.show', $sale->invoice)
        ->with('success', 'Sale invoice created successfully!');
    }
  }
  public function edit($id)
  {
    $pageConfigs = [
      'pageHeader' => true
    ];
    $breadcrumbs = [
      ['link'=>"/",'name'=> __('Home')],
      ['link'=> route('sales.index'), 'name'=> __("Sales") ],
      ['name' => __('Edit Sale')]
    ];
    $sale = $this->saleRepository->findById($id);
    $clients = Client::active()->get();
    $products = Product::active()->get();
    $company = Company::active()->first();
    return Inertia::render('Sale/Edit', [
      'breadcrumbs' => $breadcrumbs,
      'clients' => $clients,
      'products' => $products,
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
