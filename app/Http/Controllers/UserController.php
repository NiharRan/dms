<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\UserCreateRequest;
use App\Http\Requests\Users\UserUpdateRequest;
use App\Repositories\UserRepository;
use App\Users\BloodGroup;
use App\Users\Gender;
use App\Users\Religion;
use App\Users\Role;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $userRepository;
    public function __construct(UserRepository $userRepository)
    {
      $this->userRepository = $userRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $pageConfigs = [
        'pageHeader' => true
      ];
      $breadcrumbs = [
        ['link'=>"/",'name'=> __('Home')],
        ['name'=> __("Users") ],
      ];
      $users = $this->userRepository->paginate(15);

      $genders = Gender::active()->get();
      $religions = Religion::active()->get();
      $bloodGroups = BloodGroup::active()->get();
      return Inertia::render('User/Index', [
        'breadcrumbs' => $breadcrumbs,
        'users' => $users,
        'genders' => $genders,
        'religions' => $religions,
        'blood_groups' => $bloodGroups,
        'has_modal' => true
      ]);
    }

  /**
   * Store a newly created resource in storage.
   *
   * @param UserCreateRequest $request
   * @return Response
   */
  public function store(UserCreateRequest $request)
  {
    $role = Role::where('name', 'Subscriber')->first();
    $user = $this->userRepository->store($request);
    $user->role_id = $role->id;
    if ($request->hasFile('avatar')) {
      $extension = $request->file('avatar')->extension();
      //filename to store
      $fileNameToStore = \time().'.'.$extension;

      //Upload File
      $this->userRepository->uploadImage($fileNameToStore, $request);

      $user->avatar = $fileNameToStore;
    }
    if ($user->save()) {
      return redirect()
        ->route('users.index')
        ->with('success', 'User registration completed successfully!');
    }
  }

  /**
   * Update the specified resource in storage.
   *
   * @param UserUpdateRequest $request
   * @param int $id
   * @return Response
   */
  public function update(UserUpdateRequest $request, $id)
  {
    $user = $this->userRepository->update($request, $id);
    // new image provided
    if ($request->hasFile('avatar')) {
      if ($user->avatar !== 'default.jpg') {
        $originalImagePath = 'public/users/'.$user->avatar;
        $smallImagePath = 'public/users/thumbnail/small/'.$user->avatar;
        $mediumImagePath = 'public/users/thumbnail/medium/'.$user->avatar;

        Storage::delete($originalImagePath);
        Storage::delete($smallImagePath);
        Storage::delete($mediumImagePath);
      }

      $extension = $request->file('avatar')->extension();
      //filename to store
      $fileNameToStore = \time().'.'.$extension;

      //Upload File
      $this->userRepository->uploadImage($fileNameToStore, $request);

      $user->avatar = $fileNameToStore;
    }
    if ($user->save()) {
      return redirect()
        ->route('users.index')
        ->with('success', "$user->name's information updated successfully!");
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function destroy($id)
  {
    //
  }
}
