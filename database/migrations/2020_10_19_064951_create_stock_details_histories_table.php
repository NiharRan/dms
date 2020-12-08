<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStockDetailsHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_details_histories', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('stock_details_id');
            $table->foreign('stock_details_id')->references('id')->on('stock_details');

            $table->string('ship', 45)->nullable();
            $table->string('company', 45)->nullable();
            $table->unsignedDecimal('quantity', 10, 4);
            
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');

            $table->boolean('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock_details_histories');
    }
}
