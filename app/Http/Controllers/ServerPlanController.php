<?php

namespace App\Http\Controllers;

use App\Models\ServerPlan;
use Inertia\Inertia;

class ServerPlanController extends Controller
{
    /**
     * Display a listing of the server plans.
     */
    public function index()
    {
        $plans = ServerPlan::active()
            ->orderBy('hourly_cost')
            ->get();

        return Inertia::render('server-plans/index', [
            'plans' => $plans
        ]);
    }

    /**
     * Display the specified server plan.
     */
    public function show(ServerPlan $serverPlan)
    {
        return Inertia::render('server-plans/show', [
            'plan' => $serverPlan
        ]);
    }
}