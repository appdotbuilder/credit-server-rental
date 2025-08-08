<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRentedServerRequest;
use App\Models\RentedServer;
use App\Models\ServerPlan;
use App\Models\UserCredit;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RentedServerController extends Controller
{
    /**
     * Display a listing of the user's rented servers.
     */
    public function index()
    {
        $servers = auth()->user()
            ->rentedServers()
            ->with('serverPlan')
            ->latest()
            ->get();

        return Inertia::render('servers/index', [
            'servers' => $servers
        ]);
    }

    /**
     * Show the form for creating a new rented server.
     */
    public function create()
    {
        $plans = ServerPlan::active()->get();
        $userCredit = UserCredit::where('user_id', auth()->id())->first();

        return Inertia::render('servers/create', [
            'plans' => $plans,
            'userCredit' => $userCredit
        ]);
    }

    /**
     * Store a newly created rented server.
     */
    public function store(StoreRentedServerRequest $request)
    {
        $user = auth()->user();
        $plan = ServerPlan::findOrFail($request->validated()['server_plan_id']);
        
        // Check if user has sufficient credits for at least 1 hour
        $userCredit = UserCredit::firstOrCreate(
            ['user_id' => $user->id],
            ['balance' => 0]
        );

        if ($userCredit->balance < $plan->hourly_cost) {
            return back()->withErrors([
                'credits' => 'Insufficient credits to rent this server.'
            ]);
        }

        $server = RentedServer::create([
            'user_id' => $user->id,
            'server_plan_id' => $plan->id,
            'name' => $request->validated()['name'],
            'server_ip' => '192.168.' . random_int(1, 255) . '.' . random_int(1, 255), // Mock IP
            'status' => 'running',
            'started_at' => now(),
        ]);

        // Create initial rental transaction
        Transaction::create([
            'user_id' => $user->id,
            'rented_server_id' => $server->id,
            'type' => 'server_rental',
            'amount' => $plan->hourly_cost,
            'status' => 'completed',
            'description' => "Server rental: {$server->name} ({$plan->name})",
            'metadata' => [
                'server_id' => $server->id,
                'plan_name' => $plan->name,
                'hourly_cost' => $plan->hourly_cost
            ]
        ]);

        // Deduct credits
        $userCredit->decrement('balance', $plan->hourly_cost);
        $server->increment('total_cost', $plan->hourly_cost);

        return redirect()->route('servers.show', $server)
            ->with('success', 'Server rented successfully!');
    }

    /**
     * Display the specified rented server.
     */
    public function show(RentedServer $server)
    {
        // Ensure user can only view their own servers
        if ($server->user_id !== auth()->id()) {
            abort(403);
        }

        $server->load('serverPlan');

        return Inertia::render('servers/show', [
            'server' => $server
        ]);
    }

    /**
     * Update the specified rented server.
     */
    public function update(Request $request, RentedServer $server)
    {
        // Ensure user can only manage their own servers
        if ($server->user_id !== auth()->id()) {
            abort(403);
        }

        $action = $request->input('action');

        switch ($action) {
            case 'start':
                if ($server->status === 'stopped') {
                    $server->update([
                        'status' => 'running',
                        'started_at' => now(),
                        'stopped_at' => null
                    ]);
                }
                break;

            case 'stop':
                if ($server->status === 'running') {
                    $server->update([
                        'status' => 'stopped',
                        'stopped_at' => now()
                    ]);
                }
                break;

            case 'restart':
                if (in_array($server->status, ['running', 'stopped'])) {
                    $server->update([
                        'status' => 'running',
                        'started_at' => now(),
                        'stopped_at' => null
                    ]);
                }
                break;
        }

        return back()->with('success', ucfirst($action) . ' action completed successfully.');
    }

    /**
     * Remove the specified rented server.
     */
    public function destroy(RentedServer $server)
    {
        // Ensure user can only delete their own servers
        if ($server->user_id !== auth()->id()) {
            abort(403);
        }

        $server->update([
            'status' => 'terminated',
            'terminated_at' => now()
        ]);

        return redirect()->route('servers.index')
            ->with('success', 'Server terminated successfully.');
    }
}