<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserCredit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserCredit>
 */
class UserCreditFactory extends Factory
{
    protected $model = UserCredit::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'balance' => fake()->randomFloat(2, 0, 1000),
        ];
    }
}