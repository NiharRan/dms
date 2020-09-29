<?php

namespace App\Users;

use App\MyModel;

class Role extends MyModel
{
  protected $table = 'roles';
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name', 'status'
  ];
  /**
   * @var mixed
   */

  public function users()
  {
    return $this->hasMany('App\User');
  }
}
