<?php

namespace App\Settings;

use App\MyModel;

class Product extends MyModel
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name', 'slug', 'image', 'product_type_id', 'status'
  ];
  public function getCurrentStatusAttribute()
  {
    return $this->status == 1 ? 'Active' : 'Not Active';
  }

  public function getImageMediumAttribute()
  {
    return "/storage/products/thumbnail/medium/$this->image";
  }
  public function getImageSmallAttribute()
  {
    return "/storage/products/thumbnail/small/$this->image";
  }
  public function getImageOriginalAttribute()
  {
    return "/storage/products/$this->image";
  }

  protected $appends = [
    'current_status',
    'last_updated',
    'image_small',
    'image_medium',
    'image_original',
  ];


  public function product_type()
  {
    return $this->belongsTo('App\Settings\ProductType');
  }

  public function sale_details()
  {
    return $this->belongsTo('App\SaleDetails');
  }
}
