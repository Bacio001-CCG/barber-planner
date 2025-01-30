<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoogleUser extends Model
{
    protected $fillable = ['google_id', 'email', 'name', 'avatar', 'token', 'refresh_token'];
    public $timestamps = true;

    public function formatForFrontend() 
    {
        return [
            'id' => $this->id,
            'googleId' => $this->google_id,
            'email' => $this->email,
            'name' => $this->name,
            'avatar' => $this->avatar,
            'token' => $this->token,
            'refreshToken' => $this->refresh_token,
        ];
    }
}
