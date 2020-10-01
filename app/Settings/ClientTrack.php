<?php

namespace App\Settings;

use Illuminate\Database\Eloquent\Model;

class ClientTrack extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'driver_name', 'track_no', 'dl_no', 'client_id'
  ];

  public function client()
  {
    return $this->belongsTo('App\Settings\Client');
  }
}
