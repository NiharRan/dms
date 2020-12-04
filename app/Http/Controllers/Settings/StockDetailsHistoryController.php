<?php

namespace App\Http\Controllers\Settings;

use App\Company;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\StockDetailsHistoryRequest;
use App\Settings\StockDetails;
use App\Settings\StockDetailsHistory;
use Inertia\Inertia;

class StockDetailsHistoryController extends Controller
{
    public function show($stockDetailsId)
    {
        $stockDetails = StockDetails::with(['stock', 'product'])->find($stockDetailsId);
        $stockDetailsHistories = $stockDetails->stock_details_histories()
            ->orderBy('id', 'DESC')->paginate(20);

        $breadcrumbs = [
            ['link' => "/", 'name' => "Home"],
            ['link' => route('stock-details.index'), 'name' => "Stock Details"],
            ['link' => '', 'name' => "History"],
        ];
        return Inertia::render('Purchase/History', [
            'breadcrumbs' => $breadcrumbs,
            'stock_details' => $stockDetails,
            'stock_details_histories' => $stockDetailsHistories,
            'has_modal' => true
        ]);
    }


    public function print($stockDetailsId)
    {
        $company = Company::active()->orderBy('id', 'desc')->first();
        $stockDetails = StockDetails::with(['stock', 'product'])->find($stockDetailsId);
        $stockDetailsHistories = $stockDetails->stock_details_histories()
            ->orderBy('id', 'DESC')->get();

        return Inertia::render('Purchase/Print', [
            'company' => $company,
            'stock_details' => $stockDetails,
            'stock_details_histories' => $stockDetailsHistories,
        ]);
    }
}
