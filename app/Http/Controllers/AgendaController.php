<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\AppointmentRequest;
use App\Models\Customer;
use App\Models\Treatment;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\AppointmentService;

class AgendaController extends Controller
{

    public function __construct(
        protected AppointmentService $appointmentService,
    ) {}

    public function index($date = null)
    {

        if (!$date) {
            $date = Carbon::now()->format('Y-m-d');
        }

        $customers = Customer::where('company_id', Auth::user()->company->id)->get();

        $customers = $customers->map(function ($customer) {
            return $customer->formatForFrontend();
        });

        $treatments = Treatment::where('company_id', Auth::user()->company->id)->get();

        $treatments = $treatments->map(function ($treatment) {
            return $treatment->formatForFrontend();
        });

        $appointments = $this->appointmentService->getAppointments($date);

        foreach ($appointments['dates'] as $key => $value) {
            $appointments['dates']->$key = collect($value)->map(function ($appointment) {
                return $appointment->formatForFrontend();
            });
        }

        $appointments = $appointments['appointments']->map(function ($appointment) {
            return $appointment->formatForFrontend();
        });

        return Inertia::render('Dashboard/Agenda', [
            'customers' => $customers,
            'treatments' => $treatments,
            'dates' => $appointments['dates'],
            'appointments' => $appointments,
        ]);
    }

    public function store(AppointmentRequest $request)
    {
        $date_time = $request->validated()->date . ' ' . $request->validated()->time;
        $end_date_time = $request->validated()->date . ' ' . $request->validated()->end_time;

        try {
            $this->appointmentService->createNewAppointment($request, [
                'company_id' => Auth::user()->company->id,
                'date_time' => Carbon::parse($date_time),
                'end_date_time' => Carbon::parse($end_date_time) ?? Carbon::parse($date_time)->addMinutes(30),
                'notes' => $request->validated()->notes,
                'type' => $request->validated()->type,
            ], $end_date_time, $date_time);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(AppointmentRequest $request, $id)
    {
        $date_time = $request->validated()->date . ' ' . $request->validated()->time;
        $end_date_time = $request->validated()->date . ' ' . $request->validated()->end_time;
        try {
            $this->appointmentService->updateAppointment($request, [
                'id' => (int) $id,
                'company_id' => Auth::user()->company->id,
            ], [
                'company_id' => Auth::user()->company->id,
                'date_time' => Carbon::parse($date_time),
                'end_date_time' => Carbon::parse($end_date_time) ?? Carbon::parse($date_time)->addMinutes(30),
                'notes' => $request->validated()->notes,
                'type' => $request->validated()->type,
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
