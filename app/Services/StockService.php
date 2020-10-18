<?php


namespace App\Services;

use App\Settings\Stock;

class StockService
{
    public static function stock_details($id)
    {
        return Stock::find($id)->stock_details;
    }

    public static function products($id)
    {
        $stockDetails = self::stock_details($id);
        $products = [];
        if ($stockDetails->count() > 0) {
        foreach ($stockDetails as $stockDetail) {
            $stockDetail->product->quantity = $stockDetail->quantity;
            $products[] = $stockDetail->product;
        }
        }
        return $products;
    }
}