<?php


namespace App\Repositories\Settings;


use App\Settings\transactionMedia;
use App\Traits\RepositoryTrait;

class TransactionMediaRepository
{
  use RepositoryTrait;
  private $transactionMedia;
  protected $guarded = [];

  public function __construct(TransactionMedia $transactionMedia)
  {
    $this->transactionMedia = $transactionMedia;
  }

  public function all()
  {
    $rows = $this->transactionMedia->orderBy('name');
    if (request()->has('status')) {
      $rows = $rows->where('status', request()->status);
    }

    return $rows;
  }


  public function findById($rowId)
  {
    return $this->transactionMedia->find($rowId);
  }

  public function update($rowId)
  {
    $row = $this->transactionMedia->find($rowId);
    return $row->update([
      'name' => request()->name,
      'slug' => make_slug(request()->name),
      'status' => request()->status
    ]);
  }

  public function destroy($rowId)
  {
    return $this->transactionMedia->find($rowId)->delete();
  }

  public function store()
  {
    return $this->transactionMedia->create([
      'name' => request()->name,
      'slug' => make_slug(request()->name)
    ]);
  }

}
