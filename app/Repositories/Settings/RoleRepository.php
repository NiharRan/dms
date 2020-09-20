<?php


namespace App\Repositories\Settings;


use App\Settings\Role;
use Yajra\DataTables\DataTables;

class RoleRepository
{
  protected $guarded = [];
  public function all()
  {
    return Role::orderBy('name', 'asc');
  }

  public function findById($roleId)
  {
    return Role::find($roleId);
  }

  public function update($roleId)
  {
    $role = Role::find($roleId);
    return $role->update(request()->only('name'));
  }

  public function destroy($roleId)
  {
    return Role::find($roleId)->delete();
  }

  public function store()
  {
    return Role::create(request()->only('name'));
  }

  public function paginate()
  {
    return $this->all()->paginate(10);
  }
}
