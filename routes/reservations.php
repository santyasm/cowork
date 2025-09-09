<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {
    Route::get('/user-reservations', [ReservationController::class, 'userReservations'])->name('userReservations.index');
    Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');
    Route::patch('/reservations/cancel', [ReservationController::class, 'cancel'])->name('reservations.cancel');
});
