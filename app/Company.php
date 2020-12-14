<?php

namespace App;


class Company extends MyModel
{
    protected $fillable = [
      'name', 'slug', 'description', 'owner',
      'head_office', 'dipu_office', 'address',
      'sales_center', 'email', 'logo', 'status',
    ];

    public function getProfileUrlAttribute()
    {
      return route('companies.show', $this->slug);
    }

    public function getCurrentLogoAttribute()
    {
      $logo = $this->images()->logo()->first();
      if ($logo) {
        return "/storage/companies/$this->id/$logo->name";
      }
      return "/storage/companies/$this->id/default.jpeg";
    }

    public function getImageTypeAttribute()
    {
      $imageType = $this->images()->logo()->first();
      if ($imageType) {
        if ($imageType->image_type === 1) return  'Logo';
        elseif ($imageType->image_type === 2) return 'Banner';
        else return 'Feature';
      }
      return "Logo";
    }

    public function getActivePhonesAttribute()
    {
      return $this->phones()->active()->pluck('phone')->all();
    }

  protected $appends = [
      'profile_url',
      'current_logo',
      'image_type',
      'active_phones'
    ];

    public function user()
    {
      return $this->belongsTo(User::class);
    }

    public function images()
    {
      return $this->hasMany(CompanyImage::class);
    }

    public function phones()
    {
      return $this->hasMany(CompanyPhone::class);
    }

    public function sales()
    {
      return $this->hasMany(Sale::class);
    }
    public function driver_invoices()
    {
      return $this->hasMany(DriverInvoice::class);
    }


    public function logo()
    {
      return $this->hasOne(CompanyImage::class)->logo();
    }

    public function banner()
    {
      return $this->hasOne(CompanyImage::class)->banner();
    }

    public function stocks()
    {
        return $this->hasMany(CompanyStock::class, 'company_id');
    }
}
