<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Services\AppointmentService;
use App\Http\Services\CustomerService;
use App\Http\Services\TreatmentService;

class LookupController extends Controller
{

    public function __construct(
        protected AppointmentService $appointmentService,
        protected CustomerService $customerService,
        protected TreatmentService $treatmentService,
    ) {}

    public function index()
    {

        $appointments = $this->appointmentService->getAppointments();
        $finished = $this->appointmentService->getFinishedAppointments();
        $treatments = $this->treatmentService->getTreatments();
        $customers = $this->customerService->getCustomers();

        $customers = $customers->map(function ($customer) {
            return $customer->formatForFrontend();
        });
        $treatments = $treatments->map(function ($treatment) {
            return $treatment->formatForFrontend();
        });
        $appointments = $appointments->map(function ($appointment) {
            return $appointment->formatForFrontend();
        });
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
