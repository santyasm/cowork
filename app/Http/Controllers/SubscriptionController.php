<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubscriptionRequest;
use App\Models\Plan;
use App\Models\Subscription;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = Auth::user();

            if ($user->role !== 'admin') {
                throw new Exception('Usuario nao autorizado.');
            }

            $subscriptions = Subscription::all();

            return response()->json($subscriptions, 200);
        } catch (\Exception $ex) {
            return response()->json(['Erro ao buscar assinaturas: ' => $ex->getMessage()], 400);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
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
            Subscription::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'start_date' => Carbon::now(),
                'end_date' => (Carbon::now()->addMonth()),
                'remaining_hours_room' => $plan->hours_room,
                'remaining_hours_desk' => $plan->hours_desk
            ]);

            return redirect()->back()->with('success', 'Assinatura criada com sucesso!');
        } catch (\Exception $ex) {
            return response()->json(['Erro ao inserir assinaturas: ' => $ex->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Subscription $subscription)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subscription $subscription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subscription $subscription)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subscription $subscription)
    {
        //
    }
}
