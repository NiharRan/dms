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

Auth::routes(['verify' => false]);

// Route url
Route::middleware(['auth', 'lang'])->group(function () {
  Route::get('/', 'DashboardController@index');

  Route::group([
    'prefix' => 'settings',
    'namespace' => 'Settings'
  ], function () {
    // Role routes
    Route::get('/roles', 'RoleController@index')->name('roles.index');
    Route::post('/roles', 'RoleController@store')->name('roles.store');
    Route::put('/roles/{roleId}', 'RoleController@update')->name('roles.update');
    Route::delete('/roles/{roleId}', 'RoleController@destroy')->name('roles.destroy');

    // Gender routes
    Route::get('/genders', 'GenderController@index')->name('genders.index');
    Route::post('/genders', 'GenderController@store')->name('genders.store');
    Route::put('/genders/{roleId}', 'GenderController@update')->name('genders.update');
    Route::delete('/genders/{roleId}', 'GenderController@destroy')->name('genders.destroy');
  });
});

