<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\CustomerRequest;
use App\Models\Customer;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\API\OpenStreetMapController;
use Faker\Provider\ar_EG\Address;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::where('company_id', 1)->get();

        $customers = $customers->map(function ($customer) {
            return $customer->formatForFrontend();
        });

        return Inertia::render('Dashboard/Customers', [
            'customers' => $customers,
        ]);
    }

    public function store(CustomerRequest $request)
    {
        if (!$request->osm_id) {
            $openStreetMapController = new OpenStreetMapController();
            $addressData = $openStreetMapController->_fetchAddressData($request->input('address'));
            if(isset($addressData['osm_id'])) $request->merge(['osm_id' => $addressData['osm_id']]);
        }

        $customer = Customer::create([
            'company_id' => Auth::user()->company->id,
            'first_name' => $request->first_name,
            'infix' => $request->infix,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'location' => $request->location,
            'postal_code' => $request->postal_code,
            'osm_id' => $request->osm_id,
        ]);

        Log::info('Customer created: ' . $customer->id);

    }

    public function update(CustomerRequest $request, $id)
    {
        Customer::where([
            'id' => $id,
            'company_id' => Auth::user()->company->id,
        ])->update([
            'first_name' => $request->first_name,
            'infix' => $request->infix,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'location' => $request->location,
            'postal_code' => $request->postal_code,
            'osm_id' => $request->osm_id,
        ]);

        Log::info('Customer updated: ' . $id);

    }

    public function destroy($id)
    {
        Customer::where([
            'id' => $id,
            'company_id' => Auth::user()->company->id,
        ])->delete();

        Log::info('Customer updated: ' . $id);

    }
}
