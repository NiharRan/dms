<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CustomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
      foreach ($bloodGroups as $bloodGroup) {
        DB::table('blood_groups')->insert([
          'name' => $bloodGroup,
          'status' => 1,
          'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
          'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
      }

      $genders = ['Male', 'Female', 'Others'];
      foreach ($genders as $gender) {
        DB::table('genders')->insert([
          'name' => $gender,
          'status' => 1,
          'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
          'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
      }

      $religions = ['Hindu', 'Muslim', 'Cristian', 'Buddha'];
      foreach ($religions as $religion) {
        DB::table('religions')->insert([
          'name' => $religion,
          'status' => 1,
          'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
          'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
      }

      $roles = ['Admin', 'Operator',];
      foreach ($roles as $role) {
        DB::table('roles')->insert([
          'name' => $role,
          'status' => 1,
          'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
          'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
      }

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
          'slug' => make_slug($stock),
          'status' => 1,
          'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
          'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
      }
    }
}
