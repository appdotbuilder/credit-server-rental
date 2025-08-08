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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('rented_server_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('type', ['credit_purchase', 'server_rental', 'refund'])->comment('Transaction type');
            $table->decimal('amount', 10, 2)->comment('Transaction amount in credits');
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
            $table->text('description')->comment('Transaction description');
            $table->json('metadata')->nullable()->comment('Additional transaction data');
            $table->timestamps();
            
            $table->index(['user_id', 'type']);
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};