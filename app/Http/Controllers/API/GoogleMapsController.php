<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\CompanySetting;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GoogleMapsController extends Controller
{

    public function getDistanceAppointment(Request $request, $appointmentId)
    {
        $settings = CompanySetting::where('company_id', Auth::user()->company->id)->first();
        $appointment = Appointment::find($appointmentId);

        $distance_calculation_step = $settings['distance_calculation_step'];

        $this_days_appointments = Appointment::where('company_id', Auth::user()->company->id)->where('date_time', 'like', Carbon::parse($appointment->date_time)->format('Y-m-d') . '%')->orderBy('date_time')->get();
        $appointment_index = $this_days_appointments->search(function ($item) use ($appointment) {
            return $item->id == $appointment->id;
        });

        $is_first_appointment = (bool)($request->query('is_first_appointment') ?? ($appointment_index == 0));
        $is_last_appointment = (bool)($request->query('is_last_appointment') ?? ((count($this_days_appointments) == ($appointment_index + 1))));

        $previouse_adres = null;
        $company_adres = Auth::user()->company->location . " " . Auth::user()->company->address;
        $destination_adres = $appointment->customers[0]->location . " " . $appointment->customers[0]->address;

        // Set previous address based on calculation steps
        // if from_appointment_to_appointment is selected and is_first_appointment is true, the distance will be calculated from company to appointment
        if ($distance_calculation_step == 'from_appointment_to_appointment') {
            if ($is_first_appointment) {
                $previouse_adres = $company_adres;
            } else {
                $previouse_adres = $this_days_appointments[$appointment_index - 1]->customers[0]->location . " " . $this_days_appointments[$appointment_index - 1]->customers[0]->address;
            }
        } else if ($distance_calculation_step == 'from_company_to_appointment_to_company') {
            $previouse_adres = $company_adres;
        }

        // Set longs and lats based on calculation steps
        if ($distance_calculation_step == 'from_company_to_appointment_to_company') {
            $adres_steps = $company_adres . ';' . $destination_adres . ';' . $company_adres;
        } else if ($distance_calculation_step == 'from_appointment_to_appointment') {

            if ($is_first_appointment) {
                $adres_steps = $company_adres . ';' . $destination_adres;
            } else if ($is_last_appointment) {
                $adres_steps = $previouse_adres . ';' . $destination_adres . ';' . $company_adres;
            } else {
                $adres_steps = $previouse_adres . ';' . $destination_adres;
            }
        }

        $googleApi = $this->_getDistanceBetweenAddresses($adres_steps);
        return response()->json(['distance' => $googleApi['distance'], 'duration' => $googleApi['duration']]);
    }

    private function _getDistanceBetweenAddresses(string $adresses)
    {
        $duration = 0;
        $distance = 0;
        $json = null;

        $adres_steps = explode(';', $adresses);
        $steps = [];

        if (count($adres_steps) === 3) {
            $steps[] = [$adres_steps[0], $adres_steps[1]];
            $steps[] = [$adres_steps[1], $adres_steps[2]];
        } else {
            $steps[] = [$adres_steps[0], $adres_steps[1]];
        }

        foreach ($steps as $step) {
            $info = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post('https://maps.googleapis.com/maps/api/distancematrix/json?destinations=' . $step[0] . '&origins=' . $step[1] . '&units=imperia&key=' . env('GOOGLE_API_KEY'));
            $duration += $info->json()['rows'][0]['elements'][0]['duration']['value'];
            $distance += $info->json()['rows'][0]['elements'][0]['distance']['value'];
        }

        return [
            'duration' => $duration,
            'distance' => $distance,
        ];
    }
}
