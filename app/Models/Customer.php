<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public $fillable = [
        'company_id',
        'first_name',
        'infix',
        'last_name',
        'email',
        'phone_number',
        'address',
        'location',
        'postal_code',
        'osm_id',
    ];

    public $timestamps = true;

    public function formatForFrontend() 
    {
        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'infix' => $this->infix,
            'lastName' => $this->last_name,
            'email' => $this->email,
            'phoneNumber' => $this->phone_number,
            'address' => $this->address,
            'location' => $this->location,
            'postalCode' => $this->postal_code,
            'companyId' => $this->company_id,
            'osmId' => $this->osm_id,
        ];
    }
}
