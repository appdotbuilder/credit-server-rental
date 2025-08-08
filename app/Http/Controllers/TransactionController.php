<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the user's transactions.
     */
    public function index()
    {
        $transactions = auth()->user()
            ->transactions()
            ->with('rentedServer.serverPlan')
            ->latest()
            ->paginate(20);

        return Inertia::render('transactions/index', [
            'transactions' => $transactions
        ]);
    }

    /**
     * Display the specified transaction.
     */
    public function show(Transaction $transaction)
    {
        // Ensure user can only view their own transactions
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        $transaction->load('rentedServer.serverPlan');

        return Inertia::render('transactions/show', [
            'transaction' => $transaction
        ]);
    }
}