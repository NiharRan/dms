<?php

namespace App;

use App\Services\BanglaNumberToWord;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
      'invoice', 'total_price', 'total_paid', 'total_due',
      'company_id', 'client_id', 'sale_date', 'status', 'user_id'
    ];

    public function getWordAttribute()
    {
      if($this->total_due == 0) {
        $str = ' পরিশোধ করা হয়েছে';
        $amount = $this->total_paid;
      }else {
        $str = ' বাকি আছে';
        $amount = $this->total_due;
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

    public function transactions()
    {
      return $this->morphMany('\App\Transaction', 'transactionable');
    }
}
