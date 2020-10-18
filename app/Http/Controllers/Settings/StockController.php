<?php

namespace App\Http\Controllers\Settings;

use App\Http\Requests\Settings\StockRequest;
use App\Repositories\Settings\StockRepository;
use App\Http\Controllers\Controller;
use App\Services\StockService;
use Inertia\Inertia;
use Inertia\Response;

class StockController extends Controller
{
  private $stockRepository;
  function __construct(StockRepository $stockRepository)
  {
    $this->stockRepository = $stockRepository;
  }

  /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $stocks = $this->stockRepository->paginate(10);
      $breadcrumbs = [
        ['link'=>"/",'name'=>"Home"],['link'=>"",'name'=>"Stocks"]
      ];
      return Inertia::render('Stock/Index', [
        'breadcrumbs' => $breadcrumbs,
        'stocks' => $stocks,
        'has_modal' => true
      ]);
    }

  /**
   * Store a newly created resource in storage.
   *
   * @param StockRequest $request
   * @return \Illuminate\Http\Response
   */
  public function store(StockRequest $request)
  {
    $stock = $this->stockRepository->store($request);
    if ($stock) return redirect()
      ->route('stocks.index')
      ->with('success', "$stock->name created successfully!");
  }


  /**
   * Update the specified resource in storage.
   *
   * @param StockRequest $request
   * @param $id
   * @return \Illuminate\Http\Response
   */
  public function update(StockRequest $request, $id)
  {
    $stock = $this->stockRepository->update($request, $id);
    if ($stock) {
      return redirect()
        ->route('stocks.index')
        ->with('success', 'Stock info updated successfully!');
    }
  }

  /**
   * fetch all products of specific stock.
   *
   * @param $id
   * @return \Illuminate\Http\Response
   */
  public function products($id)
  {
    $products = StockService::products($id);
    if ($products) {
      return response()
        ->json($products);
    }
  }
}
