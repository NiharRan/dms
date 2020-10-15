<?php

namespace App\Settings;

use App\MyModel;

class Stock extends MyModel
{
    protected $fillable = [
        'name', 'slug', 'address', 'status', 'creator'
    ];

    public function stock_details()
    {
        return $this->hasMany('App\Settings\StockDetails');
    }
}
