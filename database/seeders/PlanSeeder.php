<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::create([
            'name' => 'Básico',
            'description' => 'Ideal para freelancers iniciantes',
            'price' => 99.90,
            'hours_room' => 5,
            'hours_desk' => 20
        ]);

        Plan::create([
            'name' => 'Profissional',
            'description' => 'Mais horas e salas maiores',
            'price' => 199.90,
            'hours_room' => 15,
            'hours_desk' => 50,
        ]);

        Plan::create([
            'name' => 'Premium',
            'description' => 'Para empresas ou usuários intensivos',
            'price' => 399.90,
            'hours_room' => 40,
            'hours_desk' => 120,
        ]);
    }
}
