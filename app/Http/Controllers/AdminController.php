<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Renderiza a view do dashboard do admin.
     * Os dados serão buscados pelo frontend via API.
     */
    public function index()
    {
        return Inertia::render('admin/admin-dashboard');
    }

    /**
     * Renderiza a view de listagem de usuários.
     * A busca dos usuários será feita via API pelo frontend.
     */
    public function users()
    {
        return Inertia::render('admin/users');
    }
}
