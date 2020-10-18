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
      $transaction_types = ['Purchase', 'Driver Invoice', 'Sale', 'Expense', 'Paid', 'Due'];
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
    }
}
