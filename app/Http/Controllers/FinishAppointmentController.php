<?php

namespace App\Http\Controllers;

use App\Models\FinishedAppointment;
use Illuminate\Http\Request;
use App\Http\Requests\FinishedAppointmentRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Functions\Currency;

class FinishAppointmentController extends Controller
{
    public function store(FinishedAppointmentRequest $request)
    {
        FinishedAppointment::create([
            'appointment_id' => $request->appointment_id,
            'company_id' => Auth::user()->company->id,
            'price' => Currency::convertToEuro($request->price),
            'tip' => $request->tip,
            'payment_type' => $request->payment_type,
            'distance' => $request->distance,
        ]);

        Log::info('Appointment finished: ' . $request->appointment_id);
    }

    public function update(FinishedAppointmentRequest $request, $finish_appointment)
    {
        FinishedAppointment::where([
            'appointment_id' => $finish_appointment,
            'company_id' => Auth::user()->company->id,
        ])->update([
            'price' => Currency::convertToEuro($request->price),
            'tip' => $request->tip,
            'payment_type' => $request->payment_type,
            'distance' => $request->distance,
        ]);

        Log::info('Appointment updated: ' . $finish_appointment);
    }
}
