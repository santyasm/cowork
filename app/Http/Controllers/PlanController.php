<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $plans = Plan::with('rooms')->get();
            $user = Auth::user();
            $userSubscription = $user->subscriptions()->where('status', 'active')->first();

            return Inertia::render('plans/Index', [
                'plans' => $plans,
                'user_subscription' => $userSubscription
            ]);
        } catch (\Exception $ex) {
            response()->json(['message' => 'Erro ao buscar planos.'], 404);
        }
    }
}
