<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Settings\StockDetails;
use Inertia\Inertia;

class StockDetailsHistoryController extends Controller
{
    public function show($stockDetailsId)
    {
        $stockDetails = StockDetails::with(['stock', 'product'])->find($stockDetailsId);
        $stockDetailsHistories = $stockDetails->stock_details_histories()
            ->orderBy('id', 'DESC')->paginate(20);

        $breadcrumbs = [
            ['link'=>"/",'name'=>"Home"],
            ['link'=> route('stock-details.index'),'name'=>"Stock Details"],
            ['link'=> '','name'=>"History"],
        ];
        return Inertia::render('Purchase/History', [
            'breadcrumbs' => $breadcrumbs,
            'stock_details' => $stockDetails,
            'stock_details_histories' => $stockDetailsHistories,
            'has_modal' => true
        ]);
    }
}
