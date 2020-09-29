<?php


namespace App\Repositories\Settings;


use App\Settings\ProductType;
use App\Traits\RepositoryTrait;

class ProductTypeRepository
{
  use RepositoryTrait;
  private $productType;
  protected $guarded = [];

  public function __construct(ProductType $productType)
  {
    $this->productType = $productType;
  }

  public function all()
  {
    $rows = $this->productType->orderBy('name');
    if (request()->has('status')) {
      $rows = $rows->where('status', request()->status);
    }

    return $rows;
  }


  public function findById($rowId)
  {
    return $this->productType->find($rowId);
  }

  public function update($rowId)
  {
    $row = $this->productType->find($rowId);
    return $row->update([
      'name' => request()->name,
      'slug' => make_slug(request()->name),
      'status' => request()->status
    ]);
  }

  public function destroy($rowId)
  {
    return $this->productType->find($rowId)->delete();
  }

  public function store()
  {
    return $this->productType->create([
      'name' => request()->name,
      'slug' => make_slug(request()->name)
    ]);
  }

}
