<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomSeederAfterUser extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $transaction_types = ['In', 'Out'];
    foreach ($transaction_types as $transaction_type) {
      DB::table('transaction_types')->insert([
        'name' => $transaction_type,
        'slug' => make_slug($transaction_type),
        'status' => 1,
        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
      ]);
    }

    $product_types = ['Coal', 'Sand'];
    foreach ($product_types as $product_type) {
      DB::table('product_types')->insert([
        'name' => $product_type,
        'slug' => make_slug($product_type),
        'status' => 1,
        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
      ]);
    }

    $measurement_types = ['ফিতা', 'স্কেল'];
    foreach ($measurement_types as $measurement_type) {
      DB::table('measurement_types')->insert([
        'name' => $measurement_type,
        'slug' => make_slug($measurement_type),
        'status' => 1,
        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
      ]);
    }

    $products = ['Indian Coal', 'Russian Coal'];
    foreach ($products as $product) {
      DB::table('products')->insert([
        'name' => $product,
        'slug' => make_slug($product),
        'product_type_id' => 1,
        'status' => 1,
        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
      ]);
    }

    DB::table('clients')->insert([
      'name' => 'Demo Client',
      'slug' => make_slug('Demo Client'),
      'phone' => '01726535344',
      'address' => 'Sylhet',
      'balance' => 50000,
      'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
      'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
    ]);

    $stocks = ['চরচাষী ঘাট', 'পারটেক্স ঘাট'];
    foreach ($stocks as $stock) {
      DB::table('stocks')->insert([
        'name' => $stock,
        'status' => 1,
        'user_id' => 1,
        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
      ]);
    }

    $transaction_medias = ['Bank', 'Cash'];
    foreach ($transaction_medias as $transaction_media) {
      DB::table('transaction_media')->insert([
        'name' => $transaction_media,
        'status' => 1,
        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
      ]);
    }

    DB::table('loads')->insert([
      'amount' => 140,
      'stock_rent' => 400,
      'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
      'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
    ]);
  }
}
