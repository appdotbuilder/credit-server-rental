<?php

namespace Database\Factories;

use App\Models\ServerPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServerPlan>
 */
class ServerPlanFactory extends Factory
{
    protected $model = ServerPlan::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true) . ' VPS',
            'description' => fake()->sentence(),
            'cpu' => fake()->randomElement([1, 2, 4, 8]),
            'ram' => fake()->randomElement([1, 2, 4, 8, 16]),
            'storage' => fake()->randomElement([20, 50, 100, 200]),
            'hourly_cost' => fake()->randomFloat(4, 0.01, 0.50),
            'is_active' => true,
        ];
    }
}