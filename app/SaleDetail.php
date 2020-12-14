<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SaleDetail extends Model
{
    protected $fillable = [
      'sale_id', 'product_id', 'quantity', 'price', 'amount', 'track_no'
    ];

    public function sale()
    {
      return $this->belongsTo('App\Sale')->withTimestamps();
    }
    public function product()
    {
      return $this->belongsTo('App\Settings\Product');
    }
}
