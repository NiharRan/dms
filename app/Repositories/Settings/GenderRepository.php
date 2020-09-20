<?php


namespace App\Repositories\Settings;


use App\Users\Gender;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Str;

class GenderRepository
{
  protected $guarded = [];
  public function all()
  {
    $rows = Gender::orderBy('name');
    if (request()->has('status')) {
      $rows = $rows->where('status', request()->status);
    }

    return $rows;
  }


  public function findById($rowId)
  {
    return Gender::find($rowId);
  }

  public function update($rowId)
  {
    $row = Gender::find($rowId);
    return $row->update([
      'name' => request()->name,
      'slug' => Str::slug(request()->name),
      'status' => request()->status
    ]);
  }

  public function destroy($rowId)
  {
    return Gender::find($rowId)->delete();
  }

  public function store()
  {
    return Gender::create([
      'name' => request()->name,
      'slug' => Str::slug(request()->name)
    ]);
  }

  public function paginate()
  {
    return $this->all()->paginate(10);
  }
}
