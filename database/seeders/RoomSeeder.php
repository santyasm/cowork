<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Room::create([
            'name' => 'Mesa Individual 1',
            'type' => 'desk',
            'capacity' => 1,
            'description' => 'Mesa confortável com cadeira ergonômica',
        ]);

        Room::create([
            'name' => 'Sala de Reunião A',
            'type' => 'room',
            'capacity' => 6,
            'description' => 'Sala equipada com TV e whiteboard',
        ]);

        Room::create([
            'name' => 'Auditório Principal',
            'type' => 'room',
            'capacity' => 50,
            'description' => 'Espaço para palestras e eventos',
        ]);
    }
}
