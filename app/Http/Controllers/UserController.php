<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        try {
            $users = User::where('role', 'user')
                ->with(['subscriptions' => function ($query) {
                    $query->with('plan');
                }])
                ->get();

            return response()->json($users);
        } catch (\Exception $ex) {
            return response()->json(['error' => 'Erro ao buscar usuários: ' . $ex->getMessage()], 400);
        }
    }
}
