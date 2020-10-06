<?php

namespace App;

use App\Services\BanglaNumberToWord;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
      'invoice', 'total_price', 'total_paid', 'total_due',
      'company_id', 'client_id', 'driver_name', 'track_no',
      'dl_no', 'sale_date', 'status', 'user_id'
    ];

    public function getWordAttribute()
    {
      return (new BanglaNumberToWord())->numToWord($this->total_due);
    }

    protected $appends = [
      'word'
    ];


    public function company()
    {
      return $this->belongsTo('App\Company');
    }
    public function client()
    {
      return $this->belongsTo('App\Settings\Client');
    }
    public function creator()
    {
      return $this->belongsTo('App\User');
    }
    public function sale_details()
    {
      return $this->hasMany('App\SaleDetail');
    }
}
