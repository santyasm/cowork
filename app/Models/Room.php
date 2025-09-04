<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;



class Room extends Model
{
    protected $fillable = [
        'name',
        'type',
        'capacity',
        'description'
    ];


    public function plans()
    {
        return $this->belongsToMany(Plan::class, 'plan_room');
    }
}
