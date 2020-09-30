<?php

namespace App;


class Company extends MyModel
{
    protected $fillable = [
      'name', 'slug', 'description', 'owner',
      'head_office', 'dipu_office', 'address',
      'sales_center', 'email', 'phone', 'logo', 'status'
    ];

    public function getProfileUrlAttribute()
    {
      return route('companies.show', $this->slug);
    }

    public function getCurrentLogoAttribute()
    {
      $logo = $this->images()->logo()->first()->name;
      return "/storage/companies/$this->id/$logo";
    }

    public function getImageTypeAttribute()
    {
      $imageType = $this->images()->logo()->first()->image_type;
      if ($imageType === 1) return  'Logo';
      elseif ($imageType == 2) return 'Banner';
      else return 'Feature';
    }

    protected $appends = [
      'profile_url',
      'current_logo',
      'image_type'
    ];

    public function user()
    {
      return $this->belongsTo('App\User');
    }

    public function images()
    {
      return $this->hasMany('App\CompanyImage');
    }
}
