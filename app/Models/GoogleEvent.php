<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoogleEvent extends Model
{
    protected $fillable = ['event_id', 'appointment_id', 'company_id'];
    public $timestamps = true;

    public function formatForFrontend() 
    {
        return [
            'id' => $this->id,
            'eventId' => $this->event_id,
            'appointmentId' => $this->appointment_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'company_id' => $this->company_id,
        ];
    }
}
