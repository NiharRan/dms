<?php

namespace App\Observers;

use App\DriverInvoice;
use App\Settings\TransactionType;

class DriverInvoiceObserver
{
    private $transactionType;
    private $user;
    public function __construct()
    {
        $this->user = auth()->user();
        $this->transactionType = TransactionType::where('name', '=', 'Driver Invoice')->first();
    }
    /**
     * Handle the driver invoice "created" event.
     *
     * @param  \App\DriverInvoice  $driverInvoice
     * @return void
     */
    public function created(DriverInvoice $driverInvoice)
    {
        $driverInvoice->transactions()->create([
            'transaction_type_id' => $this->transactionType->id,
            'amount' => $driverInvoice->total,
            'user_id' => $this->user->id,
        ]);
    }

    /**
     * Handle the driver invoice "updated" event.
     *
     * @param  \App\DriverInvoice  $driverInvoice
     * @return void
     */
    public function updated(DriverInvoice $driverInvoice)
    {
        $driverInvoice->transactions()->delete();
        $driverInvoice->transactions()->create([
            'transaction_type_id' => $this->transactionType->id,
            'amount' => $driverInvoice->total,
            'user_id' => $this->user->id,
        ]);
    }

    /**
     * Handle the driver invoice "deleted" event.
     *
     * @param  \App\DriverInvoice  $driverInvoice
     * @return void
     */
    public function deleted(DriverInvoice $driverInvoice)
    {
        $driverInvoice->transactions()->delete();
    }
}
