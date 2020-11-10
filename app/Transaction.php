<?php

namespace App;

use App\Settings\TransactionMedia;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'transaction_type_id', 'transactionable_id', 'transactionable_type', 'amount',
        'status', 'user_id', 'transaction_media_id', 'description'
      ];

    /**
     * Get the owning transactionable model.
     */
    public function transactionable()
    {
        return $this->morphTo();
    }

    /**
     * Get the owning transaction media model.
     */
    public function media()
    {
        return $this->belongsTo(TransactionMedia::class);
    }
}
