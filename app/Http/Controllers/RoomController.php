<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = Auth::user();
            $userSubscription = $user->subscriptions()->where('status', 'active')->first();

            $rooms = $userSubscription ? $userSubscription->plan->rooms()->get() : collect();

            return Inertia::render('rooms/Index', [
                'rooms' => $rooms
            ]);
        } catch (\Exception $ex) {
            return response()->json(["Erro ao buscar salas." => $ex->getMessage()], 400);
        }
    }
}
