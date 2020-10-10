<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDriverInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('driver_invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('invoice');

            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('products');

            $table->unsignedInteger('quantity');
            $table->string('scale', 45)->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->decimal('track_rent', 10, 2);
            $table->decimal('others', 10, 2)->nullable();
            $table->decimal('total', 10, 2);
            $table->decimal('paid', 10, 2)->nullable();
            $table->decimal('due', 10, 2)->nullable();

            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->references('id')->on('companies');

            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')->references('id')->on('clients');

            $table->string('driver_name');
            $table->string('track_no');
            $table->string('driver_phone');
            $table->dateTime('invoice_date');
            $table->boolean('status')->default(0);

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
        Schema::dropIfExists('driver_invoices');
    }
}
