<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\StockDetailsRequest;
use App\Http\Resources\StockDetailsResource;
use App\Repositories\Settings\StockDetailsRepository;
use App\Settings\Product;
use App\Settings\Stock;
use Inertia\Inertia;

class StockDetailsController extends Controller
{

    private $stockDetailsRepository;
    function __construct(StockDetailsRepository $stockDetailsRepository)
    {
        $this->stockDetailsRepository = $stockDetailsRepository;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $stockDetails = StockDetailsResource::collection($this->stockDetailsRepository->paginate(10));
        $stocks = Stock::active()->get();
        $products = Product::active()->get();
        $breadcrumbs = [
            ['link'=>"/",'name'=>"Home"],['link'=>"",'name'=>"Stock Details"]
        ];
        return Inertia::render('Purchase/Index', [
            'breadcrumbs' => $breadcrumbs,
            'stock_details' => $stockDetails,
            'products' => $products,
            'stocks' => $stocks,
            'has_modal' => true
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StockDetailsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StockDetailsRequest $request)
    {
        $stockDetails = $this->stockDetailsRepository->store($request);
            if ($stockDetails) return redirect()
            ->route('stock-details.index')
            ->with('success', "Stock purchase done successfully!");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\StockDetailsRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StockDetailsRequest $request, $id)
    {
        $stockDetails = $this->stockDetailsRepository->update($request, $id);
        if ($stockDetails) {
        return redirect()
            ->route('stock-details.index')
            ->with('success', 'Stock purchase info updated successfully!');
        }
    }
}
