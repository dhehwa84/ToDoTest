<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    protected $fillable = ['title', 'status', 'created_by'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
