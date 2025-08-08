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
        Schema::create('server_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Plan name (e.g., Basic VPS)');
            $table->text('description')->comment('Plan description');
            $table->integer('cpu')->comment('Number of CPU cores');
            $table->integer('ram')->comment('RAM in GB');
            $table->integer('storage')->comment('Storage in GB');
            $table->decimal('hourly_cost', 8, 4)->comment('Cost per hour in credits');
            $table->boolean('is_active')->default(true)->comment('Whether plan is available');
            $table->timestamps();
            
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('server_plans');
    }
};