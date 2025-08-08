<?php

namespace App\Http\Controllers;

use App\Http\Requests\PurchaseCreditsRequest;
use App\Models\Transaction;
use App\Models\UserCredit;
use Inertia\Inertia;

class CreditController extends Controller
{
    /**
     * Display the credit purchase form.
     */
    public function index()
    {
        $userCredit = UserCredit::firstOrCreate(
            ['user_id' => auth()->id()],
            ['balance' => 0]
        );

        return Inertia::render('credits/index', [
            'userCredit' => $userCredit
        ]);
    }

    /**
     * Store a credit purchase.
     */
    public function store(PurchaseCreditsRequest $request)
    {
        $user = auth()->user();
        $amount = $request->validated()['amount'];

        // Simulate payment processing (in real app, integrate with Stripe/PayPal)
        $paymentSuccess = random_int(1, 10) > 1; // 90% success rate for demo

        if (!$paymentSuccess) {
            return back()->withErrors([
                'payment' => 'Payment processing failed. Please try again.'
            ]);
        }

        // Create transaction
        $transaction = Transaction::create([
            'user_id' => $user->id,
            'type' => 'credit_purchase',
            'amount' => $amount,
            'status' => 'completed',
            'description' => "Credit purchase: {$amount} credits",
            'metadata' => [
                'payment_method' => 'mock_payment',
                'payment_id' => 'mock_' . uniqid()
            ]
        ]);

        // Add credits to user balance
        $userCredit = UserCredit::firstOrCreate(
            ['user_id' => $user->id],
            ['balance' => 0]
        );
        $userCredit->increment('balance', $amount);

        return back()->with('success', "Successfully purchased {$amount} credits!");
    }
}