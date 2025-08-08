<?php

namespace Database\Factories;

use App\Models\RentedServer;
use App\Models\ServerPlan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RentedServer>
 */
class RentedServerFactory extends Factory
{
    protected $model = RentedServer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'server_plan_id' => ServerPlan::factory(),
            'name' => fake()->words(2, true) . ' Server',
            'server_ip' => fake()->ipv4(),
            'status' => fake()->randomElement(['running', 'stopped']),
            'started_at' => fake()->dateTimeBetween('-1 month'),
            'total_cost' => fake()->randomFloat(2, 0, 100),
        ];
    }
}