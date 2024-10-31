<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    public $fillable = [
        'user_id',
        'name',
        'location',
        'address',
        'postal_code',
        'phone_number',
        'email',
        'kvk_number',
        'btw_number',
        'iban',
        'type',
        'strict',
    ];

    public $timestamps = true;

    public function formatForFrontend() 
    {
        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'name' => $this->name,
            'location' => $this->location,
            'address' => $this->address,
            'postalCode' => $this->postal_code,
            'phoneNumber' => $this->phone_number,
            'email' => $this->email,
            'kvkNumber' => $this->kvk_number,
            'btwNumber' => $this->btw_number,
            'iban' => $this->iban,
            'type' => $this->type,
            'strict' => $this->strict,
        ];
    }

}
