<?php

namespace App;

class CompanyPhone extends MyModel
{
    protected $fillable = [
      'phone', 'company_id', 'status'
    ];


    public function company()
    {
      return $this->belongsTo('App\Company')->withTimestamps();
    }
}
