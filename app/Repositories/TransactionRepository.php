<?php


namespace App\Repositories;


use App\Traits\RepositoryTrait;
use App\Transaction;

class TransactionRepository
{
  use RepositoryTrait;

  private $transaction;
  protected $guarded = [];

  public function __construct(Transaction $transaction)
  {
    $this->transaction = $transaction;
  }

  public function all()
  {
    $transactions = $this->transaction->with(['media', 'transaction_type', 'creator', 'transactionable']);

    if (\request()->has('status') && !empty(request()->status)) {
      $transactions = $transactions->where('status', \request()->status);
    }

    if (\request()->has('media') && request()->media != '') {
      $transactions = $transactions->where('transaction_media_id', \request()->media);
    }

    if (\request()->has('transaction_type') && request()->transaction_type != '') {
      $transactions = $transactions->where('transaction_type_id', \request()->transaction_type);
    }

    if (\request()->has('invoice') && !empty(request()->invoice)) {
      $invoice = request()->invoice;
      $transactions = $transactions->whereHasMorph('transactionable', '*', function ($query) use ($invoice) {
        $query->where('invoice', $invoice);
      });
    }

    if (\request()->has('start_date') && !empty(request()->start_date)) {
      $start_date = \request()->start_date . ' 00:00:00';
      $end_date = \request()->end_date . ' 23:59:59';
      $transactions = $transactions->whereBetween('created_at', [$start_date, $end_date]);
    }

    return $transactions->orderBy('id', 'desc');
  }

  public function findById($rowId)
  {
    return $this->transaction->with([
      'media',
      'transaction_type',
      'creator',
    ])->find($rowId);
  }
}
