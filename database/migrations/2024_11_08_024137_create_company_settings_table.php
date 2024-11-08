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
        Schema::create('company_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->enum('distance_calculation_step', ['from_appointment_to_appointment', 'from_company_to_appointment_to_company'])->default('from_appointment_to_appointment');
            $table->enum('measurement', ['meter', 'yard'])->default('meter');
            $table->enum('currency', ['EUR', 'USD', 'GBP'])->default('EUR');
            $table->enum('language', ['NL', 'EN'])->default('NL');
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_settings');
    }
};
