<?php

namespace App\Http\Services;

use App\Models\Appointment;
use Carbon\Carbon;
use App\Functions\Agenda;
use Illuminate\Support\Facades\Auth;
use App\Functions\Calendar;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\AppointmentRequest;
use App\Models\GoogleEvent;
use App\Models\FinishedAppointment;
use Illuminate\Support\Collection;

class AppointmentService
{

    public function __construct(
        protected Appointment $appointmentModel,
        protected FinishedAppointment $finishedAppointmentModel,
    ) {}

    public function getAppointments(): Collection
    {
        return $this->appointmentModel->where('company_id', Auth::user()->company->id)->get();
    }

    public function getAppointmentsByDate(string $date): array
    {
        // Get appointments using the cookies
        $appointments = $this->appointmentModel->where('company_id', Auth::user()->company->id);
        if (isset($_COOKIE['view']) && $_COOKIE['view'] == 'day') {
            $appointments->whereDate('date_time', $date);
        } else if (isset($_COOKIE['view']) && $_COOKIE['view'] == 'week') {
            $appointments->whereBetween('date_time', [Carbon::parse($date)->startOfWeek(), Carbon::parse($date)->endOfWeek()]);
        } else {
            $appointments->whereBetween('date_time', [Carbon::parse($date)->startOfMonth(), Carbon::parse($date)->endOfMonth()]);
        }

        $appointments = $appointments->orderBy('date_time')->get();

        $agendaClass = new Agenda($appointments);
        $dates = $agendaClass->getDates();

        return ['appointments' => $appointments, 'dates' => $dates];
    }

    public function createNewAppointment(AppointmentRequest $request, array $data, string $end_date_time, string $date_time)
    {
        $appointment = $this->appointmentModel->create($data);

        $treatments = $request->validated()['treatments'];
        for ($i = 0; $i < count($treatments); $i++) {
            $appointment->treatments()->attach($treatments[$i]);
        }
        $customers = $request->validated()['customers'];
        for ($i = 0; $i < count($customers); $i++) {
            $appointment->customers()->attach($customers[$i]);
        }


        try {
            $calendar = new Calendar();
            $calendar->eventTrigger($request, $appointment, $end_date_time, $date_time, 'create');
        } catch (\Exception $e) {
            Log::error('Error creating event: ' . $e->getMessage());
            return response()->json(['error' => 'Error creating event'], 500);
        }
    }

    public function updateAppointment(AppointmentRequest $request, array $filter, array $data, string $end_date_time, string $date_time)
    {
        $appointment = $this->appointmentModel->where($filter)->firstOrFail();
        $appointment->update($data);

        Log::info('Appointment updated: ' . $appointment->id);

        $appointment->treatments()->detach();
        for ($i = 0; $i < count($request->validated()['treatments']); $i++) {
            $appointment->treatments()->attach($request->validated()['treatments'][$i]);
        }

        $appointment->customers()->detach();
        for ($i = 0; $i < count($request->validated()['customers']); $i++) {
            $appointment->customers()->attach($request->validated()['customers'][$i]);
        }

        try {
            $calendar = new Calendar();
            $calendar->eventTrigger($request, $appointment, $end_date_time, $date_time, 'update');
        } catch (\Exception $e) {
            Log::error('Error updating event: ' . $e->getMessage());
            return response()->json(['error' => 'Error updating event'], 500);
        }
    }

    public function deleteAppointment(int $id)
    {

        $appointment = Appointment::where([
            'id' => $id,
            'company_id' => Auth::user()->company->id,
        ])->first();

        $appointment = $this->appointmentModel->where('id', $id)->firstOrFail();
        $appointment->treatments()->detach();
        $appointment->customers()->detach();
        $appointment->delete();

        $g_event = GoogleEvent::where(['appointment_id' => $appointment->id, 'company_id' => Auth::user()->company->id])->first();
        if (!$g_event) return;

        try {
            $calendar = new Calendar();
            $calendar->deleteEvent($g_event->id);
        } catch (\Exception $e) {
            Log::error('Error deleting event: ' . $e->getMessage());
            return response()->json(['error' => 'Error deleting event'], 500);
        }
    }

    public function createFinishedAppointment(array $data)
    {
        $this->finishedAppointmentModel->create($data);
    }

    public function updateFinishedAppointment(array $filter, array $data): int
    {
        return $this->finishedAppointmentModel->where($filter)->update($data);
    }

    public function deleteFinishedAppointment(array $filter): Collection
    {
        return $this->finishedAppointmentModel->where($filter)->delete();
    }
    public function getFinishedAppointments(): Collection
    {
        return $this->finishedAppointmentModel->where('company_id', Auth::user()->company->id)->get();
    }
}
