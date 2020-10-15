<?php


namespace App\Repositories\Settings;


use App\Settings\transactionType;
use App\Traits\RepositoryTrait;

class TransactionTypeRepository
{
  use RepositoryTrait;
  private $transactionType;
  protected $guarded = [];

  public function __construct(TransactionType $transactionType)
  {
    $this->transactionType = $transactionType;
  }

  public function all()
  {
    $rows = $this->transactionType->orderBy('name');
    if (request()->has('status')) {
      $rows = $rows->where('status', request()->status);
    }

    return $rows;
  }


  public function findById($rowId)
  {
    return $this->transactionType->find($rowId);
  }

  public function update($rowId)
  {
    $row = $this->transactionType->find($rowId);
    return $row->update([
      'name' => request()->name,
      'slug' => make_slug(request()->name),
      'status' => request()->status
    ]);
  }

  public function destroy($rowId)
  {
    return $this->transactionType->find($rowId)->delete();
  }

  public function store()
  {
    return $this->transactionType->create([
      'name' => request()->name,
      'slug' => make_slug(request()->name)
    ]);
  }

}
