<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\Appointment;

class ValidateController extends Controller
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

        // TODO: Get the user_id from the authenticated user
        Log::info('API request: https://nominatim.openstreetmap.org/search, by: ' . 'Auth::user()->id');

        if (!isset($response->json()[0])) {
            return ['error' => 'Address not found'];
        }

        $addressDetails = $this->getAddressInfoByOSMID($response->json()[0]);
        return $addressDetails[0] ?? null;
    }


    public function getAddressInfoByOSMID($data)
    {
        $type = 'N';
        if($data['type'] == 'way') {
            $type = 'W';
        } else if($data['type'] == 'relation') {
            $type = 'R';
        }
        $response = Http::withHeaders([
            'User-Agent' => 'YourAppName/1.0 (your-email@example.com)',
        ])->get('https://nominatim.openstreetmap.org/lookup', [
            'osm_ids' => $type.$data['osm_id'],
            'format' => 'json',
        ]);

        // TODO: Get the user_id from the authenticated user  
        Log::info('API request: https://nominatim.openstreetmap.org/lookup, by: ' . 'Auth::user()->id');

        return $response->json();
    }

    public function getDistanceAppointment(Request $request, $appointmentId)
    {
        // Get prev appointment
        $prevAppointment = null;
        $prevOsmId = null;

        $desAppointment = Appointment::find($appointmentId);
        $desOsmId = $desAppointment->customers[0]->osm_id;

        // Get previouse appointment or home depending on settings. If no previouse settings use home aswell.
        $desDetails = $this->getAddressInfoByOSMID($desOsmId);
        $prevDetails = $this->getAddressInfoByOSMID($prevOsmId);
    }

    public function getDistanceBetweenAddresses(Request $request)
    {
        $originLongLat = $request->query('origin');
        $destLongLat = $request->query('destination');

        dd($originLongLat, $destLongLat);

    }

    public function getKvkData($kvkNumber)
    {
        $response = Http::withHeaders([
            'apikey' => env('KVK_API_KEY'),
        ])->get('https://api.kvk.nl/api/v2/zoeken', [
            'kvkNummer' => $kvkNumber,
        ]);
        
        if($response->status() != 200) {
            return response()->json();
        }

        $response2 = Http::withHeaders([
            'apikey' => env('KVK_API_KEY'),
        ])->get('https://api.kvk.nl/api/v1/basisprofielen/'.$kvkNumber);

        if($response2->status() != 200) {
            return response()->json();
        }        

        // TODO: Get the user_id from the authenticated user  
        Log::info('API request: https://api.kvk.nl/api/v2/zoeken, by: ' . 'Auth::user()->id');

        $data = $response->json()['resultaten'][0];
        $adres = $response2->json()['_embedded']['hoofdvestiging']['adressen'][0];

        Log::debug($data);
        Log::debug($adres);

        return response()->json([
            'name' => $data['naam'],
            'location' => $adres['plaats'],
            'address' => $adres['straatnaam'] . ' ' . $adres['huisnummer'] . (isset($adres['huisnummerToevoeging']) ? $adres['huisnummerToevoeging'] : ''),            
            'postal_code' => $adres['postcode'],
            'type' => $data['type'],
            'kvk_number' => $data['kvkNummer'],
        ]);
        
    }

}
