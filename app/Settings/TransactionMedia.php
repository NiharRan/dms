<?php

namespace App\Settings;

use App\MyModel;
use App\Sale;
use App\Transaction;

class TransactionMedia extends MyModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'status'
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}
