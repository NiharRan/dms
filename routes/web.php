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

    // Company routes
    Route::get('/companies', 'CompanyController@index')->name('companies.index');
    Route::post('/companies', 'CompanyController@store')->name('companies.store');
    Route::put('/companies/{companyId}', 'CompanyController@update')->name('companies.update');
    Route::delete('/companies/{companyId}', 'CompanyController@destroy')->name('companies.destroy');
    Route::get('/companies/{slug}', 'CompanyProfileController@show')->name('companies.show');

    // Sale routes
    Route::get('/sales', 'SaleController@index')->name('sales.index');
    Route::get('/sales/create', 'SaleController@create')->name('sales.create');
    Route::post('/sales', 'SaleController@store')->name('sales.store');
    Route::put('/sales/{saleId}', 'SaleController@update')->name('sales.update');
    Route::delete('/sales/{saleId}', 'SaleController@destroy')->name('sales.destroy');
    Route::get('/sales/invoice/{saleId}', 'SaleInvoiceController@show')->name('sales.invoice.show');

    // Driver Invoice routes
    Route::get('/drivers/invoices', 'DriverInvoiceController@index')->name('drivers.invoices.index');
    Route::get('/drivers/invoices/create', 'DriverInvoiceController@create')->name('drivers.invoices.create');
    Route::post('/drivers/invoices', 'DriverInvoiceController@store')->name('drivers.invoices.store');
    Route::get('/drivers/invoices/{id}', 'DriverInvoiceController@edit')->name('drivers.invoices.edit');
    Route::put('/drivers/invoices/{id}', 'DriverInvoiceController@update')->name('drivers.invoices.update');
    Route::delete('/drivers/invoices/{driverI/invoiced}', 'DriverInvoiceController@destroy')->name('drivers.invoices.destroy');
    Route::get('/drivers/invoices/invoice/{invoice}', 'DriverInvoiceController@show')->name('drivers.invoices.show');

    Route::group([
      'prefix' => 'settings',
      'namespace' => 'Settings'
    ], function () {
      // Product type routes
      Route::get('/product-types', 'ProductTypeController@index')->name('product-types.index');
      Route::post('/product-types', 'ProductTypeController@store')->name('product-types.store');
      Route::put('/product-types/{productTypeId}', 'ProductTypeController@update')->name('product-types.update');
      Route::delete('/product-types/{productTypeId}', 'ProductTypeController@destroy')->name('product-types.destroy');

      // Product routes
      Route::get('/products', 'ProductController@index')->name('products.index');
      Route::post('/products', 'ProductController@store')->name('products.store');
      Route::put('/products/{productId}', 'ProductController@update')->name('products.update');
      Route::delete('/products/{productId}', 'ProductController@destroy')->name('products.destroy');

      // Client routes
      Route::get('/clients', 'ClientController@index')->name('clients.index');
      Route::post('/clients', 'ClientController@store')->name('clients.store');
      Route::put('/clients/{clientId}', 'ClientController@update')->name('clients.update');
      Route::delete('/clients/{clientId}', 'ClientController@destroy')->name('clients.destroy');
    });

    Route::group([
      'prefix' => 'users',
      'namespace' => 'Users'
    ], function () {
      // Role routes
      Route::get('/roles', 'Role@index')->name('roles.index');
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



