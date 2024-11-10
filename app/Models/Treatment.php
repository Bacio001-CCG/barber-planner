<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Functions\Currency;


class Treatment extends Model
{
    public $fillable = [
        'name',
        'price',
        'company_id',
    ];

    public $timestamps = true;

    public function formatForFrontend() 
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => Currency::convertToCurrency($this->price),
            'companyId' => $this->company_id,
        ];
    }

}
