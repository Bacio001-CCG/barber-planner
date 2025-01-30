<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('finished_appointments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('appointment_id')->index();
            $table->unsignedBigInteger('company_id')->index();
            $table->decimal('price', 10, 2);
            $table->decimal('tip', 10, 2);
            $table->enum('payment_type', ['cash', 'card']);
            $table->integer('distance')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('finished_appointments');
    }
};
