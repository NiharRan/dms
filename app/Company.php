<?php

namespace App;


class Company extends MyModel
{
    protected $fillable = [
      'name', 'slug', 'description', 'owner',
      'head_office', 'dipu_office', 'address',
      'sales_center', 'email', 'phone', 'logo', 'status'
    ];
}
