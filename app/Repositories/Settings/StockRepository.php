<?php


namespace App\Repositories\Settings;


use App\Settings\Stock;
use App\Traits\RepositoryTrait;
use Illuminate\Http\Request;

class StockRepository
{
  use RepositoryTrait;
  private $stock;
  protected $guarded = [];

  public function __construct(Stock $stock)
  {
    $this->stock = $stock;
  }

  public function all()
  {
    $rows = $this->stock->orderBy('name');
    if (request()->has('status')) {
      $rows = $rows->where('status', request()->status);
    }

    return $rows;
  }


  public function findById($rowId)
  {
    return $this->stock->find($rowId);
  }

  public function setup(Stock $stock, Request $request)
  {
    $stock->name = $request->name;
    $stock->slug = make_slug($request->name);
    $stock->stock = $request->stock;
    $stock->address = $request->address;

    return $stock;
  }

  public function update(Request $request, $rowId)
  {
    $row = $this->stock->find($rowId);
    $row = $this->setup($row, $request);
    $row->status = $request->status;
    
    if($row->save()) {
      return $row;
    }
    return null;
  }

  public function destroy($rowId)
  {
    return $this->stock->find($rowId)->delete();
  }

  public function store(Request $request)
  {
    $row = new Stock();
    $row = $this->setup($row, $request);

    if($row->save()) {
      return $row;
    }
    return null;
  }

}
