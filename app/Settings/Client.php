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
}
