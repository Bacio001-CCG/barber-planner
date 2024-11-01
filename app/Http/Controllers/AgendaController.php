<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\AppointmentRequest;
use App\Models\Appointment;
use App\Models\Customer;
use App\Models\Treatment;
use Carbon\Carbon;
use App\Functions\Agenda;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class AgendaController extends Controller
{
    public function index($date = null)
    {
        if(!$date) {
            $date = Carbon::now()->format('Y-m-d');
        }

        // TODO: Get the company_id from the authenticated user
        $customers = Customer::where('company_id', 1)->get();

        $customers = $customers->map(function ($customer) {
            return $customer->formatForFrontend();
        });

        // TODO: Get the company_id from the authenticated user
        $treatments = Treatment::where('company_id', 1)->get();

        $treatments = $treatments->map(function ($treatment) {
            return $treatment->formatForFrontend();
        });

        // TODO: Get the company_id from the authenticated user
        // Get appointments using the cookies
        $appointments = Appointment::where('company_id', 1);
        if($_COOKIE['view'] == 'day') {
            $appointments->whereDate('date_time', $date);
        } else if($_COOKIE['view'] == 'week') {
            $appointments->whereBetween('date_time', [Carbon::parse($date)->startOfWeek(), Carbon::parse($date)->endOfWeek()]);
        } else {
            $appointments->whereBetween('date_time', [Carbon::parse($date)->startOfMonth(), Carbon::parse($date)->endOfMonth()]);
        }

        $appointments = $appointments->orderBy('date_time')->get();

        $agendaClass = new Agenda($appointments);
        $dates = $agendaClass->getDates();
        
        foreach ($dates as $key => $value) {
            $dates->$key = collect($value)->map(function ($appointment) {
                return $appointment->formatForFrontend();
            });
        }

        return Inertia::render('Dashboard/Agenda', [
            'customers' => $customers,
            'treatments' => $treatments,
            'dates' => $dates,
        ]);
    }

    public function store(AppointmentRequest $request)
    {
        $date_time = $request->date . ' ' . $request->time;

        // TODO: Get the company_id from the authenticated user
        $appointment = Appointment::create([
            'company_id' => 1,
            'date_time' => Carbon::parse($date_time),
            'notes' => $request->notes,
            'type' => $request->type,
        ]);

        // TODO: Get the user_id from the authenticated user
        Log::info('Appointment created: ' . $appointment->id  . ', by: ' . 'Auth::user()->id');

        for($i = 0; $i < count($request->treatments); $i++) {
            $appointment->treatments()->attach($request->treatments[$i]);
        }

        for($i = 0; $i < count($request->customers); $i++) {
            $appointment->customers()->attach($request->customers[$i]);
        }
        
    }

    public function update(AppointmentRequest $request, $id)
    {
        $date_time = $request->date . ' ' . $request->time;
        // TODO: Get the company_id from the authenticated user
        $appointment = Appointment::where([
            'id' => (int) $id,
            'company_id' => 1,
        ])->first();
        $appointment->date_time = Carbon::parse($date_time);
        $appointment->notes = $request->notes;
        $appointment->type = $request->type;
        $appointment->save();

        // TODO: Get the user_id from the authenticated user
        Log::info('Appointment updated: ' . $appointment->id  . ', by: ' . 'Auth::user()->id');

        $appointment->treatments()->detach();
        for($i = 0; $i < count($request->treatments); $i++) {
            $appointment->treatments()->attach($request->treatments[$i]);
        }

        $appointment->customers()->detach();
        for($i = 0; $i < count($request->customers); $i++) {
            $appointment->customers()->attach($request->customers[$i]);
        }
    }

    public function destroy($agenda)
    {
        // TODO: Get the company_id from the authenticated user
        $appointment = Appointment::find([
            'id' => $agenda,
            'company_id' => 1,
        ]);
        $appointment->treatments()->detach();
        $appointment->customers()->detach();
        $appointment->delete();

        // TODO: Get the user_id from the authenticated user
        Log::info('Appointment deleted: ' . $appointment->id . ', by: ' . 'Auth::user()->id');
    }
}
