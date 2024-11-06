<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class KVKController extends Controller
{

    public function getKvkData($kvk_number)
    {
        Log::debug('KVK number: ' . $kvk_number);
        $response = Http::withHeaders([
            'apikey' => env('KVK_API_KEY'),
        ])->get('https://api.kvk.nl/api/v2/zoeken', [
            'kvkNummer' => $kvk_number,
        ]);
        
        Log::info('API request: https://api.kvk.nl/api/v2/zoeken');

        if($response->status() != 200) {
            return response()->json();
        }

        $reponse_2 = Http::withHeaders([
            'apikey' => env('KVK_API_KEY'),
        ])->get('https://api.kvk.nl/api/v1/basisprofielen/'.$kvk_number);

        Log::info('API request: https://api.kvk.nl/api/v2/basisprofielen/'.$kvk_number);

        if($reponse_2->status() != 200) {
            return response()->json();
        }        

        $data = $response->json()['resultaten'][0];
        $adres = $reponse_2->json()['_embedded']['hoofdvestiging']['adressen'][0];


        return response()->json([
            'name' => $data['naam'],
            'location' => $adres['plaats'],
            'address' => $adres['straatnaam'] . ' ' . $adres['huisnummer'] . (isset($adres['huisnummerToevoeging']) ? $adres['huisnummerToevoeging'] : ''),            
            'postal_code' => $adres['postcode'],
            'type' => $reponse_2->json()['_embedded']['eigenaar']['rechtsvorm'],
            'kvk_number' => $data['kvkNummer'],
        ]);
        
    }

}
