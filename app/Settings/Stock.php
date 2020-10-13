<?php

namespace App\Settings;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = [
        'name', 'slug', 'address', 'quantity', 'status', 'creator'
    ];
}
