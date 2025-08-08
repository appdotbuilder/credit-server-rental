<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    
    // Server rental routes
    Route::resource('servers', App\Http\Controllers\RentedServerController::class);
    
    // Credit management routes
    Route::controller(App\Http\Controllers\CreditController::class)->group(function () {
        Route::get('/credits', 'index')->name('credits.index');
        Route::post('/credits', 'store')->name('credits.store');
    });
    
    // Transaction history routes
    Route::controller(App\Http\Controllers\TransactionController::class)->group(function () {
        Route::get('/transactions', 'index')->name('transactions.index');
        Route::get('/transactions/{transaction}', 'show')->name('transactions.show');
    });
    
    // Server plans (public viewing)
    Route::controller(App\Http\Controllers\ServerPlanController::class)->group(function () {
        Route::get('/plans', 'index')->name('server-plans.index');
        Route::get('/plans/{serverPlan}', 'show')->name('server-plans.show');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
