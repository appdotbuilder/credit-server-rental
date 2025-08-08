<?php

namespace App\Http\Controllers;

use App\Models\RentedServer;
use App\Models\Transaction;
use App\Models\UserCredit;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();

        // Get user's credit balance
        $userCredit = UserCredit::firstOrCreate(
            ['user_id' => $user->id],
            ['balance' => 0]
        );

        // Get recent servers
        $recentServers = RentedServer::where('user_id', $user->id)
            ->with('serverPlan')
            ->latest()
            ->take(5)
            ->get();

        // Get recent transactions
        $recentTransactions = Transaction::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'userCredit' => $userCredit,
            'recentServers' => $recentServers,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}