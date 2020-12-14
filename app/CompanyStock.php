<?php

namespace App;

use App\Settings\Product;

class CompanyStock extends MyModel
{
    protected $fillable = [
        'company_id', 'product_id', 'quantity', 'status', 'creator'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
