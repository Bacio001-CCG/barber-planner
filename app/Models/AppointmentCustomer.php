<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppointmentCustomer extends Model
{
    public $fillable = [
        'appointment_id',
        'customer_id',
    ];

    public $timestamps = true;

    public function formatForFrontend() 
    {
        return [
            'id' => $this->id,
            'appointmentId' => $this->appointment_id,
            'customerId' => $this->customer_id,
        ];
    }
}
