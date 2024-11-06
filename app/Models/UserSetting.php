<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model
{
    public $fillable = [
        'user_id',
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
            'userId' => $this->user_id,
            'distanceCalculationStep' => $this->distance_calculation_step,
            'measurement' => $this->measurement,
            'currency' => $this->currency,
            'language' => $this->language
        ];
    }
}
