<?php

namespace App\Settings;

use App\MyModel;

class StockDetails extends MyModel
{
    protected $fillable = [
        'stock_id', 'product_id', 'amount', 'status', 'creator'
    ];

    public function stock()
    {
        return $this->belongsTo('App\Settings\Stock');
    }

    public function product()
    {
        return $this->belongsTo('App\Settings\Product');
    }
}
