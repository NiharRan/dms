<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;


Route::group([
  'middleware' => 'lang'
], function () {
  Auth::routes(['verify' => false]);
  // Route url
  Route::middleware('auth')->group(function () {
    Route::get('/', 'DashboardController@index');

    Route::get('/users', 'UserController@index')->name('users.index');
    Route::get('/users/{slug}', 'UserProfileController@show')->name('users.show');
    Route::post('/users/profile/account/{id}', 'UserProfileController@accountUpdate')
      ->name('users.profile.account.update');
    Route::post('/users/profile/avatar/{id}', 'UserProfileController@uploadImage')
      ->name('users.profile.avatar.update');
    Route::post('/users', 'UserController@store')->name('users.store');
    Route::put('/users/{id}', 'UserController@update')->name('users.update');
    Route::delete('/users/{id}', 'UserController@destroy')->name('users.destroy');

    Route::group([
      'prefix' => 'users',
      'namespace' => 'Users'
    ], function () {
      // Role routes
      Route::get('/roles', 'RoleController@index')->name('roles.index');
      Route::post('/roles', 'RoleController@store')->name('roles.store');
      Route::put('/roles/{roleId}', 'RoleController@update')->name('roles.update');
      Route::delete('/roles/{roleId}', 'RoleController@destroy')->name('roles.destroy');

      // Gender routes
      Route::get('/genders', 'GenderController@index')->name('genders.index');
      Route::post('/genders', 'GenderController@store')->name('genders.store');
      Route::put('/genders/{genderId}', 'GenderController@update')->name('genders.update');
      Route::delete('/genders/{genderId}', 'GenderController@destroy')->name('genders.destroy');

      // Religion routes
      Route::get('/religions', 'ReligionController@index')->name('religions.index');
      Route::post('/religions', 'ReligionController@store')->name('religions.store');
      Route::put('/religions/{religionId}', 'ReligionController@update')->name('religions.update');
      Route::delete('/religions/{religionId}', 'ReligionController@destroy')->name('religions.destroy');

      // Blood group routes
      Route::get('/blood-groups', 'GenderController@index')->name('blood-groups.index');
      Route::post('/blood-groups', 'GenderController@store')->name('blood-groups.store');
      Route::put('/blood-groups/{bloodGroupId}', 'GenderController@update')->name('blood-groups.update');
      Route::delete('/blood-groups/{bloodGroupId}', 'GenderController@destroy')->name('blood-groups.destroy');
    });
  });
});



