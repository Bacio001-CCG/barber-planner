<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    public $fillable = [
        'company_id',
        'date_time',
        'notes',
        'type',
        'end_date_time',
    ];
    
    public $timestamps = true;

    public function formatForFrontend() 
    {
        return [
            'id' => $this->id,
            'companyId' => $this->company_id,
            'treatments' => $this->treatments->map(function ($treatment) {
                return $treatment->formatForFrontend();
            }),
            'customers' => $this->customers->map(function ($customer) {
                return $customer->formatForFrontend();
            }),
            'dateTime' => $this->date_time,
            'endDateTime' => $this->end_date_time,
            'notes' => $this->notes,
            'highlight' => $this->highlight ?? false,
            'type' => $this->type,
            'finished' => $this->finishedAppointment ? true : false,
        ];
    }

    public function treatments()
    {
        return $this->belongsToMany(Treatment::class);
    }

    public function customers()
    {
        return $this->belongsToMany(Customer::class);
    }

    public function finishedAppointment()
    {
        return $this->hasOne(FinishedAppointment::class);
    }
}
