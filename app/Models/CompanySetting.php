<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanySetting extends Model
{
    public $fillable = [
        'company_id',
        'distance_calculation_step',
        'measurement',
        'currency',
        'language'
    ];

    public $timestamps = true;

    public function formatForFrontend() 
    {
        return [
            'id' => $this->id,
            'companyId' => $this->company_id,
            'distanceCalculationStep' => $this->distance_calculation_step,
            'measurement' => $this->measurement,
            'currency' => $this->currency,
            'language' => $this->language
        ];
    }
}
