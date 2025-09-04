<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    /** @use HasFactory<\Database\Factories\PlanFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'hours_room',
        'hours_desk'
    ];


    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'plan_room');
    }
}
