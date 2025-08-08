<?php

namespace Database\Seeders;

use App\Models\ServerPlan;
use Illuminate\Database\Seeder;

class ServerPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Basic VPS',
                'description' => 'Perfect for small websites and development projects',
                'cpu' => 1,
                'ram' => 1,
                'storage' => 20,
                'hourly_cost' => 0.0149,
                'is_active' => true,
            ],
            [
                'name' => 'Standard VPS',
                'description' => 'Great for medium-sized applications and e-commerce sites',
                'cpu' => 2,
                'ram' => 2,
                'storage' => 50,
                'hourly_cost' => 0.0297,
                'is_active' => true,
            ],
            [
                'name' => 'Performance VPS',
                'description' => 'High-performance server for demanding applications',
                'cpu' => 4,
                'ram' => 8,
                'storage' => 160,
                'hourly_cost' => 0.119,
                'is_active' => true,
            ],
            [
                'name' => 'Enterprise VPS',
                'description' => 'Maximum power for enterprise-level applications',
                'cpu' => 8,
                'ram' => 16,
                'storage' => 320,
                'hourly_cost' => 0.238,
                'is_active' => true,
            ],
        ];

        foreach ($plans as $plan) {
            ServerPlan::create($plan);
        }
    }
}