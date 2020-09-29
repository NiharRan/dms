<?php

namespace App\Settings;

use App\MyModel;

class ProductType extends MyModel
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name', 'slug', 'status'
  ];

  public function products()
  {
    return $this->hasMany('App\Product');
  }
}
