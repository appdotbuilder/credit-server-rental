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
        Schema::create('rented_servers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('server_plan_id')->constrained()->onDelete('restrict');
            $table->string('name')->comment('Server name assigned by user');
            $table->string('server_ip')->nullable()->comment('Assigned server IP address');
            $table->enum('status', ['starting', 'running', 'stopped', 'terminated'])->default('starting');
            $table->timestamp('started_at')->nullable()->comment('When server was started');
            $table->timestamp('stopped_at')->nullable()->comment('When server was stopped');
            $table->timestamp('terminated_at')->nullable()->comment('When server was terminated');
            $table->decimal('total_cost', 10, 2)->default(0)->comment('Total cost accumulated');
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rented_servers');
    }
};