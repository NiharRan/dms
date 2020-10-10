<?php

namespace App;


use App\Services\BanglaNumberToWord;

class DriverInvoice extends MyModel
{
  protected $fillable = [
    'invoice', 'company_id', 'client_id', 'driver_name', 'track_no',
    'driver_phone', 'product_id', 'quantity', 'scale', 'amount', 'track_rent',
    'others', 'total', 'paid', 'due', 'status', 'user_id'
  ];

  public function getWordAttribute()
  {
    return (new BanglaNumberToWord())->numToWord($this->total);
  }

  protected $appends = [
    'word'
  ];

  public function company()
  {
    return $this->belongsTo('App\Company');
  }
  public function product()
  {
    return $this->belongsTo('App\Settings\Product');
  }
  public function client()
  {
    return $this->belongsTo('App\Settings\Client');
  }
  public function creator()
  {
    return $this->belongsTo('App\User');
  }
}
