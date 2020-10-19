<?php

namespace App\Settings;

use App\MyModel;

class StockDetails extends MyModel
{
    protected $fillable = [
        'stock_id', 'product_id', 'quantity', 'status', 'creator'
    ];

    public function stock()
    {
        return $this->belongsTo('App\Settings\Stock');
    }

    public function product()
    {
        return $this->belongsTo('App\Settings\Product');
    }

    public function stock_details_histories()
    {
        return $this->hasMany(StockDetailsHistory::class, 'stock_details_id');
    }

    public function transaction()
    {
      return $this->morphOne('\App\Transaction', 'transactionable');
    }
}
