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

use Illuminate\Support\Facades\Auth;
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

    // Company routes
    Route::get('/companies', 'CompanyController@index')->name('companies.index');
    Route::post('/companies', 'CompanyController@store')->name('companies.store');
    Route::put('/companies/{companyId}', 'CompanyController@update')->name('companies.update');
    Route::get('/companies/{slug}', 'CompanyProfileController@show')->name('companies.show');

    // Sale routes
    Route::get('/sales', 'SaleController@index')->name('sales.index');
    Route::get('/sales/create', 'SaleController@create')->name('sales.create');
    Route::post('/sales', 'SaleController@store')->name('sales.store');
    Route::get('/sales/{saleId}', 'SaleController@edit')->name('sales.edit');
    Route::put('/sales/{saleId}', 'SaleController@update')->name('sales.update');
    Route::delete('/sales/{saleId}', 'SaleController@destroy')->name('sales.destroy');
    Route::get('/sales/invoice/{invoice}', 'SaleInvoiceController@show')->name('sales.invoices.show');
    Route::post('/sales/invoice/{invoice}', 'SaleInvoiceController@pay')->name('sales.invoices.pay');
    Route::get('/sales/invoice/print/{invoice}', 'SaleInvoiceController@print')->name('sales.invoices.print');

    // Driver Invoice routes
    Route::get('/drivers/invoices', 'DriverInvoiceController@index')->name('drivers.invoices.index');
    Route::get('/drivers/invoices/create', 'DriverInvoiceController@create')->name('drivers.invoices.create');
    Route::post('/drivers/invoices', 'DriverInvoiceController@store')->name('drivers.invoices.store');
    Route::get('/drivers/invoices/{id}', 'DriverInvoiceController@edit')->name('drivers.invoices.edit');
    Route::put('/drivers/invoices/{id}', 'DriverInvoiceController@update')->name('drivers.invoices.update');
    Route::delete('/drivers/invoices/{driverI/invoiced}', 'DriverInvoiceController@destroy')->name('drivers.invoices.destroy');
    Route::get('/drivers/invoices/invoice/{invoice}', 'DriverInvoiceController@show')->name('drivers.invoices.show');
    Route::get('/drivers/invoices/print/{invoice}', 'DriverInvoiceController@print')->name('drivers.invoices.print');
    Route::get('/drivers/invoices/commissions/{referenceCode}', 'DriverInvoiceController@commissions')->name('drivers.invoices.commissions');

    Route::group([
      'prefix' => 'settings',
      'namespace' => 'Settings'
    ], function () {
      // Product type routes
      Route::get('/product-types', 'ProductTypeController@index')->name('product-types.index');
      Route::post('/product-types', 'ProductTypeController@store')->name('product-types.store');
      Route::put('/product-types/{productTypeId}', 'ProductTypeController@update')->name('product-types.update');

      // Loads routes
      Route::get('/loads', 'LoadController@index')->name('loads.index');
      Route::post('/loads', 'LoadController@store')->name('loads.store');
      Route::put('/loads/{loadId}', 'LoadController@update')->name('loads.update');


      // Product type routes
      Route::get('/measurement-types', 'MeasurementTypeController@index')->name('measurement-types.index');
      Route::post('/measurement-types', 'MeasurementTypeController@store')->name('measurement-types.store');
      Route::put('/measurement-types/{measurementTypeId}', 'MeasurementTypeController@update')->name('measurement-types.update');

      // Transaction type routes
      Route::get('/transaction-types', 'TransactionTypeController@index')->name('transaction-types.index');
      Route::post('/transaction-types', 'TransactionTypeController@store')->name('transaction-types.store');
      Route::put('/transaction-types/{transactionTypeId}', 'TransactionTypeController@update')->name('transaction-types.update');

      // Transaction media routes
      Route::get('/transaction-media', 'TransactionMediaController@index')->name('transaction-media.index');
      Route::post('/transaction-media', 'TransactionMediaController@store')->name('transaction-media.store');
      Route::put('/transaction-media/{transactionMediaId}', 'TransactionMediaController@update')->name('transaction-media.update');


       // Stock routes
       Route::get('/stocks', 'StockController@index')->name('stocks.index');
       Route::post('/stocks', 'StockController@store')->name('stocks.store');
       Route::put('/stocks/{stockId}', 'StockController@update')->name('stocks.update');
       Route::get('/stocks/{stockId}/products', 'StockController@products')->name('stocks.products');

       // Stock details routes
       Route::get('/stock-details', 'StockDetailsController@index')->name('stock-details.index');
       Route::post('/stock-details', 'StockDetailsController@store')->name('stock-details.store');
       Route::put('/stock-details/{stockDetailsId}', 'StockDetailsController@update')->name('stock-details.update');
       Route::get('/stock-details/history/{stockDetailsId}', 'StockDetailsHistoryController@show')->name('stock-details.history.show');

      // Product routes
      Route::get('/products', 'ProductController@index')->name('products.index');
      Route::post('/products', 'ProductController@store')->name('products.store');
      Route::put('/products/{productId}', 'ProductController@update')->name('products.update');

      // Client routes
      Route::get('/clients', 'ClientController@index')->name('clients.index');
      Route::post('/clients', 'ClientController@store')->name('clients.store');
      Route::put('/clients/{clientId}', 'ClientController@update')->name('clients.update');
    });

    Route::group([
      'prefix' => 'settings',
      'namespace' => 'Users'
    ], function () {
      // Role routes
      Route::get('/roles', 'RoleController@index')->name('roles.index');
      Route::post('/roles', 'RoleController@store')->name('roles.store');
      Route::put('/roles/{roleId}', 'RoleController@update')->name('roles.update');

      // Gender routes
      Route::get('/genders', 'GenderController@index')->name('genders.index');
      Route::post('/genders', 'GenderController@store')->name('genders.store');
      Route::put('/genders/{genderId}', 'GenderController@update')->name('genders.update');

      // Religion routes
      Route::get('/religions', 'ReligionController@index')->name('religions.index');
      Route::post('/religions', 'ReligionController@store')->name('religions.store');
      Route::put('/religions/{religionId}', 'ReligionController@update')->name('religions.update');

      // Blood group routes
      Route::get('/blood-groups', 'GenderController@index')->name('blood-groups.index');
      Route::post('/blood-groups', 'GenderController@store')->name('blood-groups.store');
      Route::put('/blood-groups/{bloodGroupId}', 'GenderController@update')->name('blood-groups.update');
    });
  });
});



