<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\SubscriptionController;
use App\Models\Plan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $plans = Plan::with('rooms')->get();

    return Inertia::render('welcome', [
        'plans' => $plans
    ]);
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/plans', [PlanController::class, 'index']);
    Route::get('/rooms', [RoomController::class, 'index']);
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/subscriptions.php';
require __DIR__ . '/reservations.php';
require __DIR__ . '/admin.php';
