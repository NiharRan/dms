<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('invoice');
            $table->decimal('total_price', 20, 4);
            $table->decimal('total_paid', 20, 4);
            $table->decimal('total_due', 20, 4);
            $table->decimal('commission', 20, 4)->nullable();
            $table->string('reference', 20)->nullable();

            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->references('id')->on('companies');

            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')->references('id')->on('clients');

            $table->dateTime('sale_date');

            $table->unsignedBigInteger('transaction_media_id');
            $table->foreign('transaction_media_id')->references('id')->on('transaction_media');

            $table->string('description', 255)->nullable();
            $table->boolean('status')->default(0);
            $table->boolean('is_paid_from_balance')->default(0);

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');

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
        Schema::dropIfExists('sales');
    }
}
