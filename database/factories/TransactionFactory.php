<?php

namespace Database\Factories;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['credit_purchase', 'server_rental']);
        
        return [
            'user_id' => User::factory(),
            'type' => $type,
            'amount' => fake()->randomFloat(2, 1, 100),
            'status' => fake()->randomElement(['completed', 'pending']),
            'description' => $type === 'credit_purchase' ? 'Credit purchase' : 'Server rental fee',
            'metadata' => [],
        ];
    }
}