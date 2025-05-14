<?php

namespace App\Http\Controllers;

use App\Http\Requests\FinishedAppointmentRequest;
use Illuminate\Support\Facades\Auth;
use App\Functions\Currency;
use App\Http\Services\AppointmentService;

class FinishAppointmentController extends Controller
{

    public function __construct(
        protected AppointmentService $appointmentService,
    ) {}

    public function store(FinishedAppointmentRequest $request)
    {
        $this->appointmentService->createFinishedAppointment([
            'appointment_id' => $request->validated()['appointment_id'],
            'company_id' => Auth::user()->company->id,
            'price' => Currency::convertToEuro($request->validated()['price']),
            'tip' => $request->validated()['tip'],
            'payment_type' => $request->validated()['payment_type'],
            'distance' => $request->validated()['distance'],
        ]);
    }

    public function update(FinishedAppointmentRequest $request, $finish_appointment)
    {
        $this->appointmentService->updateFinishedAppointment([
            'appointment_id' => $finish_appointment,
            'company_id' => Auth::user()->company->id,
        ], [
            'price' => Currency::convertToEuro($request->validated()['price']),
            'tip' => $request->validated()['tip'],
            'payment_type' => $request->validated()['payment_type'],
            'distance' => $request->validated()['distance'],
        ]);
    }
}
