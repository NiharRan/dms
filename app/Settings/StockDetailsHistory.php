<?php

namespace App\Settings;

use Illuminate\Database\Eloquent\Model;

class StockDetailsHistory extends Model
{
    protected $fillable = [
        'stock_details_id', 'ship', 'company', 'quantity', 'status', 'user_id'
    ];

    public function stock_details()
    {
        return $this->belongsTo('App\Settings\StockDetails')->withTimestamps();
    }

    public function creator()
    {
        return $this->belongsTo('App\User', 'creator');
    }
}
