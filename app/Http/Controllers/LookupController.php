<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Treatment;
use App\Models\Appointment;
use App\Models\FinishedAppointment;
use Illuminate\Support\Facades\Auth;

class LookupController extends Controller
{

    public function index() {

        $customers = Customer::where('company_id', Auth::user()->company->id)->get();

        $customers = $customers->map(function ($customer) {
            return $customer->formatForFrontend();
        });
    
        $treatments = Treatment::where('company_id', Auth::user()->company->id)->get();
    
        $treatments = $treatments->map(function ($treatment) {
            return $treatment->formatForFrontend();
        });
    
        $appointments = Appointment::where('company_id', Auth::user()->company->id)->get();

        $appointments = $appointments->map(function ($appointment) {
            return $appointment->formatForFrontend();
        });

        $finished = FinishedAppointment::where('company_id', Auth::user()->company->id)->get();

        $finished = $finished->map(function ($finished) {
            return $finished->formatForFrontend();
        });
        
        return Inertia::render('Dashboard/Lookup', [
            'customers' => $customers,
            'treatments' => $treatments,
            'appointments' => $appointments,
            'finished' => $finished,
        ]);
    }
}
