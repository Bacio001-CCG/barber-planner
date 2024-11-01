<?php

namespace App\Http\Controllers;

use App\Models\FinishedAppointment;
use Illuminate\Http\Request;
use App\Http\Requests\FinishedAppointmentRequest;
use Illuminate\Support\Facades\Log;

class FinishAppointmentController extends Controller
{
    public function store(FinishedAppointmentRequest $request)
    {
        FinishedAppointment::create([
            'appointment_id' => $request->appointment_id,
            'price' => $request->price,
            'tip' => $request->tip,
            'payment_type' => $request->payment_type,
            'distance' => $request->distance,
        ]);

        // TODO: Get the user_id from the authenticated user
        Log::info('Appointment finished: ' . $request->appointment_id  . ', by: ' . 'Auth::user()->id');
    }
}
