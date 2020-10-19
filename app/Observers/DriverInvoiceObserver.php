<?php

namespace App\Observers;

use App\DriverInvoice;
use App\Settings\TransactionType;

class DriverInvoiceObserver
{
    private $user;
    private $driverInvoiceTransactionType;
    private $paidTransactionType;
    private $dueTransactionType;

    public function __construct()
    {
        $this->user = auth()->user();
        $this->driverInvoiceTransactionType = TransactionType::where('name', '=', 'Driver Invoice')->first();
        $this->paidTransactionType = TransactionType::where('name', '=', 'Paid')->first();
        $this->dueTransactionType = TransactionType::where('name', '=', 'Due')->first();
    }
    /**
     * Handle the driver invoice "created" event.
     *
     * @param  \App\DriverInvoice  $driverInvoice
     * @return void
     */
    public function created(DriverInvoice $driverInvoice)
    {
        if ($driverInvoice->total != '') {
            $driverInvoice->transactions()->create([
                'transaction_type_id' => $this->driverInvoiceTransactionType->id,
                'amount' => $driverInvoice->total,
                'user_id' => $this->user->id,
            ]);
        }

        if ($driverInvoice->paid != '') {
            $driverInvoice->transactions()->create([
                'transaction_type_id' => $this->paidTransactionType->id,
                'amount' => $driverInvoice->paid,
                'user_id' => $this->user->id,
            ]);
        }

       
        if ($driverInvoice->due != '') {
            $driverInvoice->transactions()->create([
                'transaction_type_id' => $this->dueTransactionType->id,
                'amount' => $driverInvoice->due,
                'user_id' => $this->user->id,
            ]);
        }
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
        $this->created($driverInvoice);
    }

    /**
     * Handle the driver invoice "deleted" event.
     *
     * @param  \App\DriverInvoice  $driverInvoice
     * @return void
     */
    public function deleted(DriverInvoice $driverInvoice)
    {
        $driverInvoice->transaction()->delete();
    }
}
