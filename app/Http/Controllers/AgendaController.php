<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\AppointmentRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\AppointmentService;
use App\Http\Services\CustomerService;
use App\Http\Services\TreatmentService;

class AgendaController extends Controller
{

    public function __construct(
        protected AppointmentService $appointmentService,
        protected CustomerService $customerService,
        protected TreatmentService $treatmentService,
    ) {}

    public function index($date = null)
    {

        if (!$date) {
            $date = Carbon::now()->format('Y-m-d');
        }

        $customers = $this->customerService->getCustomers();
        $treatments = $this->treatmentService->getTreatments();
        $appointmentResults = $this->appointmentService->getAppointmentsByDate($date);

        $appointments = $appointmentResults['appointments'];
        $dates = $appointmentResults['dates'];

        foreach ($dates as $key => $value) {
            $dates->$key = collect($value)->map(function ($appointment) {
                return $appointment->formatForFrontend();
            });
        }
        $appointments = $appointments->map(function ($appointment) {
            return $appointment->formatForFrontend();
        });
        $treatments = $treatments->map(function ($treatment) {
            return $treatment->formatForFrontend();
        });
        $customers = $customers->map(function ($customer) {
            return $customer->formatForFrontend();
        });

        return Inertia::render('Dashboard/Agenda', [
            'customers' => $customers,
            'treatments' => $treatments,
            'dates' => $dates,
            'appointments' => $appointments,
        ]);
    }

    public function store(AppointmentRequest $request)
    {
        $date_time = $request->validated()['date'] . ' ' . $request->validated()['time'];
        $end_date_time = $request->validated()['date'] . ' ' . $request->validated()['end_time'];

        try {
            $this->appointmentService->createNewAppointment($request, [
                'company_id' => Auth::user()->company->id,
                'date_time' => Carbon::parse($date_time),
                'end_date_time' => Carbon::parse($end_date_time) ?? Carbon::parse($date_time)->addMinutes(30),
                'notes' => $request->validated()['notes'],
                'type' => $request->validated()['type'],
            ], $end_date_time, $date_time);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(AppointmentRequest $request, $id)
    {
        $date_time = $request->validated()['date'] . ' ' . $request->validated()['time'];
        $end_date_time = $request->validated()['date'] . ' ' . $request->validated()['end_time'];
        try {
            $this->appointmentService->updateAppointment($request, [
                'id' => (int) $id,
                'company_id' => Auth::user()->company->id,
            ], [
                'company_id' => Auth::user()->company->id,
                'date_time' => Carbon::parse($date_time),
                'end_date_time' => Carbon::parse($end_date_time) ?? Carbon::parse($date_time)->addMinutes(30),
                'notes' => $request->validated()['notes'],
                'type' => $request->validated()['type'],
            ], $end_date_time, $date_time);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($agenda)
    {
        try {
            $this->appointmentService->deleteAppointment($agenda);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
