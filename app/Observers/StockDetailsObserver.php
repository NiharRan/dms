<?php

namespace App\Observers;

use App\Settings\StockDetails;
use App\Settings\TransactionType;

class StockDetailsObserver
{
    private $transactionType;
    private $user;
    public function __construct()
    {
        $this->user = auth()->user();
        $this->transactionType = TransactionType::where('name', '=', 'Purchase')->first();
    }

    /**
     * Handle the stock details "created" event.
     *
     * @param  \App\StockDetails  $stockDetails
     * @return void
     */
    public function created(StockDetails $stockDetails)
    {
        $stockDetails->transaction()->create([
            'transaction_type_id' => $this->transactionType->id,
            'amount' => $stockDetails->amount,
            'user_id' => $this->user->id,
        ]);
    }

    /**
     * Handle the stock details "updated" event.
     *
     * @param  \App\StockDetails  $stockDetails
     * @return void
     */
    public function updated(StockDetails $stockDetails)
    {
        $stockDetails->transaction()->delete();
        $stockDetails->transaction()->create([
            'transaction_type_id' => $this->transactionType->id,
            'amount' => $stockDetails->amount,
            'user_id' => $this->user->id,
        ]);
    }

    /**
     * Handle the stock details "deleted" event.
     *
     * @param  \App\StockDetails  $stockDetails
     * @return void
     */
    public function deleted(StockDetails $stockDetails)
    {
        $stockDetails->transaction()->delete();
    }
}
