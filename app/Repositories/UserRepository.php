<?php


namespace App\Repositories;


use App\Traits\RepositoryTrait;
use App\User;
use App\Users\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;

class UserRepository
{
  use RepositoryTrait;

  private $user;
  protected $guarded = [];

  public function __construct(User $user)
  {
    $this->user = $user;
  }

  public function all()
  {
    $users = $this->user->with([
      'gender',
      'religion',
      'blood_group',
      'role',
    ])->where('id', '!=', auth()->user()->id);

    if (\request()->has('status')) {
      $users = $users->where('status', \request()->status);
    }

    if (\request()->has('slug')) {
      $users = $users->where('slug', \request()->slug);
    }

    if (\request()->has('role')) {
      $role = \request()->role;
      $users = $users->whereHas('role', function ($q) use ($role) {
        $q->where('name', $role);
      });
    }
    return $users->orderBy('name', 'asc');
  }

  public function findById($rowId)
  {
    return $this->user->with([
      'gender',
      'religion',
      'blood_group',
      'role',
    ])->find($rowId);
  }

  public function findBySlug(string $slug)
  {
    return $this->user->with([
      'gender',
      'religion',
      'blood_group',
      'role',
    ])->where('slug', $slug)
      ->first();
  }

  public function store(Request $request)
  {
    $user = new User;
    $role = Role::where('name', '=', 'Operator')->first();

    $user = $this->setupData($user, $request);
    $user->email_verified_at = date('Y-m-d H:i:s');
    $user->password = Hash::make("12345678");
    $user->created_at = date('Y-m-d H:i:s');
    $user->role_id = $role->id;
    if ($user->save()) {
      return $user;
    }
    return null;
  }

  public function update(Request $request, $id)
  {
    $user = $this->findById($id);
    $this->setupData($user, $request);
    $user->status = $request->status ? 1 : 0;
    if ($user->save()) {
      return $user;
    }
    return null;
  }

  private function setupData(User $user, $request)
  {
    $user->name = $request->name;


    $slug = Str::slug($request->name, '-');

    if ($this->findBySlug($slug)) {
      $slug .= '-'. uniqid();
    }

    $user->phone = $request->phone;
    $user->email = $request->email;
    $user->slug = $slug;
    $user->gender_id = $request->gender_id;
    $user->birth_date = date('Y-m-d', strtotime($request->birth_date));
    $user->blood_group_id = $request->blood_group_id;
    $user->religion_id = $request->religion_id;
    $user->nationality = $request->nationality;
    $user->address = $request->address;
    return $user;
  }

  /**
   * Create a thumbnail of specified size
   *
   * @param string $path path of thumbnail
   * @param int $width
   * @param int $height
   */
  public function createThumbnail($path, $width, $height)
  {
    $img = Image::make($path)->resize($width, $height, function ($constraint) {
      $constraint->aspectRatio();
    });
    $img->save($path);
  }


  public function uploadImage(string $fileNameToStore, $request)
  {
    $request->file('avatar')->storeAs('public/users', $fileNameToStore);
    $request->file('avatar')->storeAs('public/users/thumbnail/small', $fileNameToStore);
    $request->file('avatar')->storeAs('public/users/thumbnail/medium', $fileNameToStore);

    //create small thumbnail
    $smallThumbnailPath = public_path('storage/users/thumbnail/small/'.$fileNameToStore);
    $this->createThumbnail($smallThumbnailPath, 150, 93);

    //create medium thumbnail
    $mediumThumbnailPath = public_path('storage/users/thumbnail/medium/'.$fileNameToStore);
    $this->createThumbnail($mediumThumbnailPath, 300, 185);
  }


}
