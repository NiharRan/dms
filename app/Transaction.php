<?php

namespace App;

use App\Settings\TransactionMedia;
use App\Settings\TransactionType;
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
        return $this->belongsTo(TransactionMedia::class, 'transaction_media_id');
    }

    /**
     * Get the owning transaction media model.
     */
    public function transaction_type()
    {
        return $this->belongsTo(TransactionType::class);
    }

    /**
     * Get the owning transaction media model.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
