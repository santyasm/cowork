<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Renderiza a view do dashboard do admin.
     */
    public function index()
    {
        $allReservations = Reservation::orderBy('updated_at', 'desc')->get();

        return Inertia::render('admin/admin-dashboard', [
            'allReservations' => $allReservations,
        ]);
    }
}
