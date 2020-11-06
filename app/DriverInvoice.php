<?php

namespace App;


use App\Services\BanglaNumberToWord;
use App\Settings\Client;
use App\Settings\Load;
use App\Settings\MeasurementType;
use App\Settings\Product;
use App\Settings\TransactionMedia;
use App\Transaction;

class DriverInvoice extends MyModel
{
  protected $fillable = [
    'invoice', 'company_id', 'client_id', 'driver_name', 'track_no',
    'driver_phone', 'product_id', 'quantity', 'measurement_type_id', 
    'container_height', 'container_length', 'container_breadth', 'track_rent',
    'others', 'total', 'paid', 'due', 'status', 'user_id', 'load_id', 'transaction_media_id'
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
    return $this->belongsTo(Company::class);
  }
  public function measurement_type()
  {
    return $this->belongsTo(MeasurementType::class);
  }
  public function product()
  {
    return $this->belongsTo(Product::class);
  }
  public function client()
  {
    return $this->belongsTo(Client::class);
  }
  public function creator()
  {
    return $this->belongsTo(User::class);
  }

  public function transactions()
  {
    return $this->morphMany(Transaction::class, 'transactionable');
  }

  public function transaction_media()
  {
    return $this->belongsTo(TransactionMedia::class);
  }

  public function track_load()
  {
    return $this->belongsTo(Load::class);
  }
}
