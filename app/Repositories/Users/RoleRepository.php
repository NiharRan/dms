<?php


namespace App\Repositories\Users;


use App\Users\Role;
use App\Traits\RepositoryTrait;
use Illuminate\Support\Str;

class RoleRepository
{
  use RepositoryTrait;

  private $role;
  protected $guarded = [];

  public function __construct(Role $role)
  {
    $this->role = $role;
  }

  public function all()
  {
    return $this->role->orderBy('name', 'asc');
  }

  public function findById($roleId)
  {
    return $this->role->find($roleId);
  }

  public function update($roleId)
  {
    $role = $this->role->find($roleId);
    $role->name = request()->name;
    $role->slug = Str::slug(request()->name);
    $role->status = request()->status;

    return $role;
  }

  public function destroy($roleId)
  {
    return $this->role->find($roleId)->delete();
  }

  public function store()
  {
    return $this->role->create([
      'name' => request()->name,
      'slug' => Str::slug(request()->name),
    ]);
  }
}
