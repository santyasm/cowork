<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubscriptionRequest;
use App\Models\Plan;
use App\Models\Reservation;
use App\Models\Subscription;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = Auth::user();

            $subscriptions = $user
                ->subscriptions()
                ->with('plan')
                ->get();

            return inertia('subscriptions/Index', [
                'subscriptions' => $subscriptions
            ]);
        } catch (\Exception $ex) {
            return response()->json(['Erro ao buscar assinaturas: ' => $ex->getMessage()], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubscriptionRequest $request)
    {
        $data = $request->validated();
        $plan = Plan::findOrFail($data['plan_id']);

        try {
            $user = Auth::user();

            $user->subscriptions()->where('status', 'active')->update(['status' => 'canceled']);

            Subscription::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'start_date' => Carbon::now(),
                'end_date' => (Carbon::now()->addMonth()),
                'remaining_hours_room' => $plan->hours_room,
                'remaining_hours_desk' => $plan->hours_desk
            ]);

            return Inertia::location(route('subscriptions.index'));
        } catch (\Exception $ex) {
            return response()->json(['Erro ao inserir assinatura: ' => $ex->getMessage()], 400);
        }
    }

    public function cancel(Request $request)
    {
        $request->validate(['id' => 'required|exists:subscriptions,id']);
        try {
            $subscription = Subscription::findOrFail($request->id);
            $user = Auth::user();

            if ($subscription->user_id !== $user->id) {
                abort(403, 'Acesso negado');
            }

            $subscription->update([
                'status' => 'canceled',
                'end_date' => Carbon::now(),
                'remaining_hours_room' => 0,
                'remaining_hours_desk' => 0,
            ]);

            Reservation::where('user_id', $user->id)
                ->where('status', 'active')
                ->update(['status' => 'canceled']);

            return Inertia::location((route('subscriptions.index')));
        } catch (\Exception $ex) {
            return response()->json(['Erro ao cancelar assinatura: ' => $ex->getMessage()], 400);
        }
    }
}
