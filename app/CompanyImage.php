<?php

namespace App;


class CompanyImage extends MyModel
{
    protected $fillable = [
      'name', 'image_type', 'company_id', 'status'
    ];

    public function scopeLogo($query)
    {
      return $query->where('image_type', 1)
        ->where('status', 1);
    }

  public function scopeBanner($query)
  {
    return $query->where('image_type', 2)
      ->where('status', 1);
  }

    public function company()
    {
      return $this->belongsTo('App\Company');
    }
}
