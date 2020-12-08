<?php


namespace App\Repositories\Settings;


use App\Settings\Load;
use App\Traits\RepositoryTrait;

class LoadRepository
{
  use RepositoryTrait;
  private $load;
  protected $guarded = [];

  public function __construct(Load $load)
  {
    $this->load = $load;
  }

  public function all()
  {
    $rows = $this->load->orderBy('id', 'desc');
    if (request()->has('status')) {
      $rows = $rows->where('status', request()->status);
    }

    return $rows;
  }


  public function findById($rowId)
  {
    return $this->load->find($rowId);
  }

  public function update($rowId)
  {
    $row = $this->load->find($rowId);
    return $row->update([
      'amount' => request()->amount,
      'stock_rent' => request()->stock_rent,
      'status' => filter_var(request()->status, FILTER_VALIDATE_BOOLEAN)
    ]);
  }

  public function destroy($rowId)
  {
    return $this->load->find($rowId)->delete();
  }

  public function store()
  {
    return $this->load->create([
      'amount' => request()->amount,
      'stock_rent' => request()->stock_rent,
      ]);
  }

}
