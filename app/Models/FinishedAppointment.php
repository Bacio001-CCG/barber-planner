<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use app\Functions\Currency;

class FinishedAppointment extends Model
{
    public $fillable = [
        'company_id',
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
            'price' => Currency::convertToCurrency($this->price),
            'tip' => Currency::convertToCurrency($this->tip),
            'paymentType' => $this->payment_type,
            'distance' => $this->distance,
            'createdAt' => $this->created_at
        ];
    }
}
