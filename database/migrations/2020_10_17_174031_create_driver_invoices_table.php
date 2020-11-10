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

            $table->unsignedDecimal('quantity', 10, 2);
            
            $table->unsignedBigInteger('measurement_type_id');
            $table->foreign('measurement_type_id')->references('id')->on('measurement_types');

            $table->unsignedDecimal('container_height')->nullable();
            $table->unsignedDecimal('container_length')->nullable();
            $table->unsignedDecimal('container_breadth')->nullable();
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

            $table->unsignedBigInteger('load_id');
            $table->foreign('load_id')->references('id')->on('loads');

            $table->unsignedBigInteger('transaction_media_id');
            $table->foreign('transaction_media_id')->references('id')->on('transaction_media');

            $table->string('description', 255)->nullable();
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
