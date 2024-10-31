<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinishedAppointment extends Model
{
    public $fillable = [
        'appointment_id',
        'price',
        'tip',
        'payment_type',
        'distance'
    ];

    public $timestamps = true;

    public function formatForFrontend() 
    {
        return [
            'id' => $this->id,
            'appointmentId' => $this->appointment_id,
            'price' => $this->price,
            'tip' => $this->tip,
            'paymentType' => $this->payment_type,
            'distance' => $this->distance,
        ];
    }
}
