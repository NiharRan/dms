<?php

namespace App\Settings;

use App\MyModel;

class MeasurementType extends MyModel
{
    /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name', 'slug', 'status'
  ];
}
