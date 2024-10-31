<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppointmentTreatment extends Model
{
    public $fillable = [
        'appointment_id',
        'treatment_id',
    ];

    public $timestamps = true;

    public function formatForFrontend() 
    {
        return [
            'id' => $this->id,
            'appointmentId' => $this->appointment_id,
            'treatmentId' => $this->treatment_id,
        ];
    }
}
