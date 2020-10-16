<?php


namespace App\Repositories\Settings;


use App\Settings\StockDetails;
use App\Traits\RepositoryTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StockDetailsRepository
{
  use RepositoryTrait;
  private $stockDetails;
  protected $guarded = [];

  public function __construct(StockDetails $stockDetails)
  {
    $this->stockDetails = $stockDetails;
  }

  public function all()
  {
    $rows = $this->stockDetails->with(['stock', 'product']);
    $rows = $rows->whereHas('stock', function ($q) {
      $q->orderBy('name', 'ASC');
    })->whereHas('product', function ($q) {
      $q->orderBy('name', 'ASC');
    });
    if (request()->has('status') && !empty(request()->status)) {
      $rows = $rows->where('status', request()->status);
    }
    if (request()->has('stock') && !empty(request()->stock)) {
      $rows = $rows->where('stock_id', request()->stock);
    }
    if (request()->has('product') && !empty(request()->product)) {
      $rows = $rows->where('product_id', request()->product);
    }
    if (request()->has('amount') && !empty(request()->amount)) {
      $rows = $rows->where('amount', request()->amount);
    }

    if (request()->has('quantity') && !empty(request()->quantity)) {
      $rows = $rows->where('quantity', request()->quantity);
    }

    return $rows;
  }


  public function findById($rowId)
  {
    return $this->stockDetails->find($rowId);
  }

  public function setup(StockDetails $stockDetails, Request $request)
  {
    $stockDetails->stock_id = $request->stock_id;
    $stockDetails->product_id = $request->product_id;
    $stockDetails->user_id = Auth::id();
    return $stockDetails;
  }

  public function update(Request $request, $rowId)
  {
    $row = $this->stockDetails->find($rowId);
    $row = $this->setup($row, $request);
    $row->status = $request->status;
    
    if($row->save()) {
      return $row;
    }
    return null;
  }

  public function destroy($rowId)
  {
    return $this->stockDetails->find($rowId)->delete();
  }

  public function store(Request $request)
  {
    $row = new StockDetails();
    $row = $this->setup($row, $request);
    $row->amount = $request->amount;
    $row->quantity = $request->quantity;
    if($row->save()) {
      return $row;
    }
    return null;
  }

  public function alreadyExists($stock_id, $product_id)
  {
    return $this->stockDetails->where([
      'stock_id' => $stock_id,
      'product_id' => $product_id
    ])->active()->first();
  }

}
