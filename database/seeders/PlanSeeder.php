<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\Room;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Cria alguns planos
        $basic = Plan::create([
            'name' => 'Básico',
            'description' => 'Ideal para freelancers que precisam de uma mesa ocasionalmente.',
            'price' => 99.90,
            'hours_room' => 0,
            'hours_desk' => 50,
        ]);

        $premium = Plan::create([
            'name' => 'Premium',
            'description' => 'Para profissionais que precisam de salas privativas com frequência.',
            'price' => 299.90,
            'hours_room' => 120,
            'hours_desk' => 120,
        ]);

        $business = Plan::create([
            'name' => 'Empresarial',
            'description' => 'Pacote completo com auditório e múltiplas salas.',
            'price' => 799.90,
            'hours_room' => 200,
            'hours_desk' => 200,
        ]);

        // Cria algumas salas
        $desk = Room::create([
            'name' => 'Mesa compartilhada',
            'type' => 'desk',
            'capacity' => 1,
            'description' => 'Mesas em área compartilhada com internet e café.'
        ]);

        $privateRoom = Room::create([
            'name' => 'Sala privativa',
            'type' => 'room',
            'capacity' => 8,
            'description' => 'Sala exclusiva para reuniões pequenas.'
        ]);

        $auditorium = Room::create([
            'name' => 'Auditório',
            'type' => 'auditorium',
            'capacity' => 60,
            'description' => 'Espaço para palestras e eventos empresariais.'
        ]);

        // Relacionando planos e salas (pivot plan_room)
        $basic->rooms()->attach($desk->id);
        $premium->rooms()->attach([$desk->id, $privateRoom->id]);
        $business->rooms()->attach([$desk->id, $privateRoom->id, $auditorium->id]);
    }
}
