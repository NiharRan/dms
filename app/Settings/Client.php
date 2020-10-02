<?php

namespace App\Settings;

use App\MyModel;

class Client extends MyModel
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name', 'slug', 'status', 'phone', 'address'
  ];

  public function tracks()
  {
    return $this->hasMany('App\Settings\ClientTrack');
  }

  public function sales()
  {
    return $this->hasMany('App\Sale');
  }

  public function driver_invoices()
  {
    return $this->hasMany('App\DriverInvoice');
  }
}
