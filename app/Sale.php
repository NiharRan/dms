<?php

namespace App;

use App\Services\BanglaNumberToWord;
use App\Settings\Client;
use App\Settings\TransactionMedia;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
  protected $fillable = [
    'invoice', 'total_price', 'total_paid', 'total_due', 'commission', 'reference',
    'company_id', 'client_id', 'sale_date', 'status', 'user_id', 
    'transaction_media_id', 'description', 'is_paid_from_balance'
  ];

  public function getWordAttribute()
  {
    if ($this->total_due == 0) {
      $str = ' পরিশোধ করা হয়েছে';
      $amount = $this->total_paid;
    } else {
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
    return $this->belongsTo(Company::class);
  }
  public function client()
  {
    return $this->belongsTo(Client::class);
  }
  public function creator()
  {
    return $this->belongsTo(User::class, 'user_id');
  }
  public function sale_details()
  {
    return $this->hasMany(SaleDetail::class);
  }

  public function transaction_media()
  {
    return $this->belongsTo(TransactionMedia::class);
  }

  public function transactions()
  {
    return $this->morphMany(Transaction::class, 'transactionable');
  }
}
