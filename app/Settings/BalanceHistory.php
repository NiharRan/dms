<?php

namespace App\Settings;

use App\MyModel;

class BalanceHistory extends MyModel
{
    /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'client_id', 'description', 'status',  'type', 'amount', 'created_at'
  ];


  public function client()
  {
    return $this->belongsTo('App\Settings/Client');
  }
}
