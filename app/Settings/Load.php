<?php

namespace App\Settings;

use App\MyModel;

class Load extends MyModel
{
    /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'amount', 'stock_rent', 'status'
  ];
}
