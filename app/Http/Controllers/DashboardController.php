<?php

namespace App\Http\Controllers;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $allReservations = $user
            ->reservations()
            ->with('room')
            ->orderBy('updated_at', 'desc')
            ->paginate(20);

        $activeReservations = $user
            ->reservations()
            ->with('room')
            ->where('status',  'active')
            ->orderBy('start_time', 'asc')
            ->paginate(10);

        $userActiveSubscription =  $user->subscriptions()->with('plan')->where('status', 'active')->first();

        return Inertia::render('dashboard', [
            'reservations' => $allReservations,
            'userActiveReservations' => $activeReservations,
            'userActiveSubscription' => $userActiveSubscription
        ]);
    }
}
