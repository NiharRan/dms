<?php


namespace App\Repositories\Settings;


use App\Settings\MeasurementType;
use App\Traits\RepositoryTrait;

class MeasurementTypeRepository
{
  use RepositoryTrait;
  private $measurementType;
  protected $guarded = [];

  public function __construct(MeasurementType $measurementType)
  {
    $this->measurementType = $measurementType;
  }

  public function all()
  {
    $rows = $this->measurementType->orderBy('name');
    if (request()->has('status')) {
      $rows = $rows->where('status', request()->status);
    }

    return $rows;
  }


  public function findById($rowId)
  {
    return $this->measurementType->find($rowId);
  }

  public function update($rowId)
  {
    $row = $this->measurementType->find($rowId);
    return $row->update([
      'name' => request()->name,
      'slug' => make_slug(request()->name),
      'status' => filter_var(request()->status, FILTER_VALIDATE_BOOLEAN)
    ]);
  }

  public function destroy($rowId)
  {
    return $this->measurementType->find($rowId)->delete();
  }

  public function store()
  {
    return $this->measurementType->create([
      'name' => request()->name,
      'slug' => make_slug(request()->name)
    ]);
  }

}
