<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use App\User;
use App\Users\Gender;
use App\Users\Religion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    protected $userRepository;
    public function __construct(UserRepository $userRepository)
    {
      $this->userRepository = $userRepository;
    }

    public function show(string $slug)
    {
      $genders = Gender::active()->orderBy('name')->get();
      $religions = Religion::active()->orderBy('name')->get();
      $user = $this->userRepository->findBySlug($slug);

      return Inertia::render('User/Profile', [
        'user' => $user,
        'genders' => $genders,
        'religions' => $religions,
      ]);
    }

    public function accountUpdate(Request $request, $id)
    {
      $validator = Validator::make($request->all(), [
        'name' => 'required',
        'phone' => 'required|size:11',
        'gender_id' => 'required',
        'religion_id' => 'required'
      ], [
        'name.required' => 'User name is required.',
        'phone.required' => 'Contact no. is required',
        'phone.size' => 'Contact no. must be 11 character',
        'gender_id.required' => 'Gender is required',
        'religion_id.required' => 'Religion is required',
      ]);

      if ($validator->fails()) {
        return redirect()->back()
            ->withErrors($validator)
            ->withInput();
      }
      $user = User::find($id);
      $user->name = $request->name;
      $user->phone = $request->phone;
      $user->email = $request->email;
      $user->gender_id = $request->gender_id;
      $user->religion_id = $request->religion_id;

      if ($user->save()) {
        return  redirect()->back()->with('success', 'Account info updated successfully!');
      }
    }

    public function uploadImage(Request $request, $id)
    {
      $user = $this->userRepository->findById($id);
      if ($request->hasFile('avatar')) {
        if ($user->avatar != 'default.png') {
          $originalImagePath = 'users/'.$user->avatar;
          $smallImagePath = 'users/thumbnail/small/'.$user->avatar;
          $mediumImagePath = 'users/thumbnail/medium/'.$user->avatar;

          Storage::disk('public')->delete($originalImagePath);
          Storage::disk('public')->delete($smallImagePath);
          Storage::disk('public')->delete($mediumImagePath);
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
          ->back()
          ->with('success', "$user->name's profile image updated successfully!");
      }
    }
}
