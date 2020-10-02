<?php

namespace App;

use App\Users\Role;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','slug', 'father_name', 'mother_name', 'avatar', 'phone', 'email', 'gender_id', 'birth_date',
        'blood_group_id', 'religion_id', 'role_id', 'nationality',
        'password', 'email_verified_at', 'status'
    ];
    protected $dates = [
      'created_at',
      'updated_at',
    ];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getIsSubscriberAttribute()
    {
      $role = Role::where('name', 'Subscriber')->first();
      return $role->id === $this->role_id;
    }
    public function getIsAdminAttribute()
    {
      $role = Role::where('name', 'Admin')->first();
      return $role->id === $this->role_id;
    }
    public function getLastUpdatedAttribute()
    {
      return $this->updated_at->diffForHumans();
    }
    public function getCurrentStatusAttribute()
    {
      return $this->status == 1 ? 'Active' : 'Not Active';
    }
    public function getProfileUrlAttribute()
    {
      return route('users.show', $this->slug);
    }
    public function getAvatarMediumAttribute()
    {
      return "/storage/users/thumbnail/medium/$this->avatar";
    }
    public function getAvatarSmallAttribute()
    {
      return "/storage/users/thumbnail/small/$this->avatar";
    }
    public function getAvatarOriginalAttribute()
    {
      return "/storage/users/thumbnail/$this->avatar";
    }

    protected $appends = [
      'current_status',
      'last_updated',
      'profile_url',
      'avatar_small',
      'avatar_medium',
      'avatar_original',
    ];

    public function scopeActive($query)
    {
      return $query->where('status', 1);
    }
    public function scopeAdmin($query)
    {
      $role = Role::where('name', 'Admin')->first();
      return $query->where('role_id', $role->id);
    }
    public function scopeSubscriber($query)
    {
      $role = Role::where('name', 'Subscriber')->first();
      return $query->where('role_id', $role->id);
    }

    public  function role() {
      return $this->belongsTo("App\Users\Role");
    }
    public  function address() {
      return $this->hasOne("App\Users\Address");
    }
    public  function gender() {
      return $this->belongsTo("App\Users\Gender");
    }
    public  function blood_group() {
      return $this->belongsTo("App\Users\BloodGroup");
    }
    public  function religion() {
      return $this->belongsTo("App\Users\Religion");
    }
    public function company()
    {
      return $this->hasOne('App\Company');
    }
    public function sales()
    {
      return $this->hasMany('App\Sale');
    }

    public function driver_invoices()
    {
      return $this->hasMany('App\DriverInvoice');
    }
}
