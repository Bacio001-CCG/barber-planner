<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class OpenStreetMapController extends Controller
{
    public function search(Request $request)
    {
        $address = $request->query('address');
        return response()->json($this->_fetchAddressData($address));
    }

    public function _fetchAddressData(string $address)
    {

        $response = Http::withHeaders([
            'User-Agent' => 'YourAppName/1.0 (your-email@example.com)',
        ])->get('https://nominatim.openstreetmap.org/search', [
            'q' => $address,
            'format' => 'json',
        ]);

        Log::info('API request: https://nominatim.openstreetmap.org/search, by: ' . Auth::user()->id);

        if (!isset($response->json()[0])) {
            return ['error' => 'Address not found'];
        }

        $address_details = $this->getAddressInfoByOSMID($response->json()[0]['osm_id']);
        return $address_details[0] ?? null;
    }


    public function getAddressInfoByOSMID($osm_id): array
    {
        $response = Http::withHeaders([
            'User-Agent' => 'YourAppName/1.0 (your-email@example.com)',
        ])->get('https://nominatim.openstreetmap.org/lookup', [
            'osm_ids' => 'N'.$osm_id,
            'format' => 'json',
        ]);

        Log::info('API request: https://nominatim.openstreetmap.org/lookup, by: ' . Auth::user()->id);

        return $response->json();
    }

    /**
     * Get distance between two addresses
     * two modes are available: from_company_to_appointment_to_company, from_appointment_to_appointment
     * if from_appointment_to_appointment is selected and is_first_appointment is true, the distance will be calculated from company to appointment
     * if from_appointment_to_appointment is selected and is_last_appointment is true, the distance will be calculated from previouse appointment to new appointment to company
     * if from_company_to_appointment_to_company is selected, the distance will be calculated from company to appointment to company
     */
    public function getDistanceAppointment(Request $request, $appointmentId)
    {
        // TODO: get settings from company
        $settings = [
            'calc_steps' => 'from_company_to_appointment_to_company',
            'unit' => 'yard',
        ];

        $calc_steps = $settings['calc_steps'];
        // TODO: check if first or last appointment
        $is_first_appointment = $request->query('is_first_appointment') ?? false;
        $is_last_appointment = $request->query('is_last_appointment') ?? false;
    
        $prev_osm_id = null;
        $company_osm_id = Auth::user()->company->osm_id;
        $company_details = $this->getAddressInfoByOSMID($company_osm_id)[0];
        $appointment = Appointment::find($appointmentId);
        $des_osm_id = $appointment->customers[0]->osm_id;
        
        if($calc_steps == 'from_appointment_to_appointment') {
            // TODO: get previous appointment osm_id or use company address
        } else if ($calc_steps == 'from_company_to_appointment_to_company') {
            $prev_osm_id = $company_osm_id;
        }

        $prev_details = $this->getAddressInfoByOSMID($prev_osm_id)[0];
        $des_details = $this->getAddressInfoByOSMID($des_osm_id)[0];

        $company_long_lat = $company_details['lon'].','.$company_details['lat'];
        $prev_long_lat = $prev_details['lon'].','.$prev_details['lat'];
        $des_long_lat = $des_details['lon'].','.$des_details['lat'];

        $longs_lats = null;

        // Set longs and lats based on calculation steps
        if($calc_steps == 'from_company_to_appointment_to_company') {
            $longs_lats = $company_long_lat.';'.$des_long_lat.';'.$company_long_lat;
        } else if ($calc_steps == 'from_appointment_to_appointment') {

            if($is_first_appointment) {
                $longs_lats = $company_long_lat.';'.$des_long_lat;
            } else if ($is_last_appointment) {
                $longs_lats = $prev_long_lat.';'.$des_long_lat.';'.$company_long_lat;
            } else {
                $longs_lats = $prev_long_lat.';'.$des_long_lat;
            }

        }

        $distance = $this->_getDistanceBetweenAddresses($longs_lats);

        return response()->json(['distance' => $distance]);
    }

    public function _getDistanceBetweenAddresses($data)
    {

        // TODO: get settings from company
        $settings = [
            'calc_steps' => 'from_company_to_appointment_to_company',
            'unit' => 'yard',
        ];

        $info = Http::withHeaders([
            'key' => env('TOMTOM_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('http://router.project-osrm.org/route/v1/driving/'.$data);

        $distance = $info->json()['routes'][0]['distance'];

        // Calculate distance in units
        if($settings['unit'] == 'meter') {
            $distance = $distance;
        } else if($settings['unit'] == 'yard') {
            $distance = $distance * 1.09361;
        }
        
        return $distance;
    }
}
