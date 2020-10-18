<?php

namespace App;


use App\Services\BanglaNumberToWord;

class DriverInvoice extends MyModel
{
  protected $fillable = [
    'invoice', 'company_id', 'client_id', 'driver_name', 'track_no',
    'driver_phone', 'product_id', 'quantity', 'measurement_type_id', 
    'container_height', 'container_length', 'container_breadth', 'track_rent',
    'others', 'total', 'paid', 'due', 'status', 'user_id'
  ];

  public function getWordAttribute()
  {
    if($this->due == 0) {
      $str = ' পরিশোধ করা হয়েছে';
      $amount = $this->paid;
    }else {
      $str = ' বাকি আছে';
      $amount = $this->due;
    }
    return (new BanglaNumberToWord())->numToWord($amount) . $str;
  }

  protected $appends = [
    'word'
  ];

  public function company()
  {
    return $this->belongsTo('App\Company');
  }
  public function measurement_type()
  {
    return $this->belongsTo('App\Settings\MeasurementType');
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

  public function transactions()
  {
    return $this->morphMany('\App\Transaction', 'transactionable');
  }
}
