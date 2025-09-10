<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $filter = $request->input('filter');

        $usersQuery = User::where('role', 'user')->with('subscriptions.plan');

        if ($search) {
            $usersQuery->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($filter && in_array($filter, ['active', 'expired', 'canceled'])) {
            $usersQuery->whereHas('subscriptions', function ($q) use ($filter) {
                $q->where('status', $filter);
            });
        }

        $users = $usersQuery->orderBy('name', 'asc')->paginate(10)->withQueryString();

        return Inertia::render('admin/users', [
            'allUsers' => $users,
            'filter' => $filter,
            'search' => $search
        ]);
    }
}
