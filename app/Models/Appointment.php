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
    ];
    
    public $timestamps = true;

    public function formatForFrontend() 
    {
        // TODO: Give bakc if finished or not, not just false.
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
            'notes' => $this->notes,
            'highlight' => $this->highlight ?? false,
            'type' => $this->type,
            'finished' => false,
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
}
