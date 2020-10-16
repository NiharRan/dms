<?php

namespace App\Observers;

use App\Sale;
use App\Settings\TransactionType;

class SaleObserver
{
    private $user;
    private $saleTransactionType;
    private $paidTransactionType;
    private $dueTransactionType;
    public function __construct()
    {
        $this->user = auth()->user();
        $this->saleTransactionType = TransactionType::where('name', '=', 'Sale')->first();
        $this->paidTransactionType = TransactionType::where('name', '=', 'Paid')->first();
        $this->dueTransactionType = TransactionType::where('name', '=', 'Due')->first();
    }

    /**
     * Handle the sale "created" event.
     *
     * @param  \App\Sale  $sale
     * @return void
     */
    public function created(Sale $sale)
    {
        $sale->transactions()->create([
            'transaction_type_id' => $this->saleTransactionType->id,
            'amount' => $sale->total_price,
            'user_id' => $this->user->id,
        ]);

        $sale->transactions()->create([
            'transaction_type_id' => $this->paidTransactionType->id,
            'amount' => $sale->total_paid,
            'user_id' => $this->user->id,
        ]);

       
        $sale->transactions()->create([
            'transaction_type_id' => $this->dueTransactionType->id,
            'amount' => $sale->total_due,
            'user_id' => $this->user->id,
        ]);
    }

    /**
     * Handle the sale "updated" event.
     *
     * @param  \App\Sale  $sale
     * @return void
     */
    public function updated(Sale $sale)
    {
        $sale->transactions()->delete();
        $this->created($sale);
    }

    /**
     * Handle the sale "deleted" event.
     *
     * @param  \App\Sale  $sale
     * @return void
     */
    public function deleted(Sale $sale)
    {
        
    }
}
