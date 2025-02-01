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
use App\Functions\Calendar;
use App\Models\GoogleEvent;

class AgendaController extends Controller
{
    public function index($date = null)
    {

        if(!$date) {
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

        // Get appointments using the cookies
        $appointments = Appointment::where('company_id', Auth::user()->company->id);
        if(isset($_COOKIE['view']) && $_COOKIE['view'] == 'day') {
            $appointments->whereDate('date_time', $date);
        } else if(isset($_COOKIE['view']) && $_COOKIE['view'] == 'week') {
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

        $appointments = $appointments->map(function ($appointment) {
            return $appointment->formatForFrontend();
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
        $date_time = $request->date . ' ' . $request->time;
        $end_date_time = $request->date . ' ' . $request->end_time;
        $appointment = Appointment::create([
            'company_id' => Auth::user()->company->id,
            'date_time' => Carbon::parse($date_time),
            'end_date_time' => Carbon::parse($end_date_time) ?? Carbon::parse($date_time)->addMinutes(30),
            'notes' => $request->notes,
            'type' => $request->type,
        ]);

        Log::info('Appointment created: ' . $appointment->id );

        for($i = 0; $i < count($request->treatments); $i++) {
            $appointment->treatments()->attach($request->treatments[$i]);
        }

        for($i = 0; $i < count($request->customers); $i++) {
            $appointment->customers()->attach($request->customers[$i]);
        }


        try {
            $calendar = new Calendar();
            $calendar->eventTrigger($request, $appointment, $end_date_time, $date_time, 'create');
        } catch (\Exception $e) {
            dd($e);
        }
        
    }

    public function update(AppointmentRequest $request, $id)
    {
        $date_time = $request->date . ' ' . $request->time;
        $end_date_time = $request->date . ' ' . $request->end_time;
        $appointment = Appointment::where([
            'id' => (int) $id,
            'company_id' => Auth::user()->company->id,
        ])->first();
        $appointment->date_time = Carbon::parse($date_time);
        $appointment->notes = $request->notes;
        $appointment->type = $request->type;
        $appointment->end_date_time = Carbon::parse($end_date_time);
        $appointment->save();

        Log::info('Appointment updated: ' . $appointment->id );

        $appointment->treatments()->detach();
        for($i = 0; $i < count($request->treatments); $i++) {
            $appointment->treatments()->attach($request->treatments[$i]);
        }

        $appointment->customers()->detach();
        for($i = 0; $i < count($request->customers); $i++) {
            $appointment->customers()->attach($request->customers[$i]);
        }

        try {
            $calendar = new Calendar();
            $calendar->eventTrigger($request, $appointment, $end_date_time, $date_time, 'update');
        } catch (\Exception $e) {
            dd($e);
        }
    }

    public function destroy($agenda)
    {
        $appointment = Appointment::where([
            'id' => $agenda,
            'company_id' => Auth::user()->company->id,
        ])->first();

        $appointment->treatments()->detach();
        $appointment->customers()->detach();
        $appointment->delete();

        Log::info('Appointment deleted: ' . $appointment->id);

        $g_event = GoogleEvent::where(['appointment_id' => $appointment->id, 'company_id' => Auth::user()->company->id])->first(); 
        if(!$g_event) return false;
        try {
            $calendar = new Calendar();
            $calendar->deleteEvent($g_event->event_id);
        } catch (\Exception $e) {
            dd($e);
        }
    }
}
