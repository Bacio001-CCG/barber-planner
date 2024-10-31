<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\CustomerRequest;
use App\Models\Customer;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\AddressController;
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
            $addressController = new AddressController();
            $addressData = $addressController->_fetchAddressData($request->input('address'));
            if(isset($addressData['osm_id'])) $request->merge(['osm_id' => $addressData['osm_id']]);
        }

        // TODO: Get the company_id from the authenticated user
        $customer = Customer::create([
            'company_id' => 1,
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

        // TODO: Get the user_id from the authenticated user
        Log::info('Customer created: ' . $customer->id . ', by: ' . 'Auth::user()->id');

    }

    public function update(CustomerRequest $request, $id)
    {
        // TODO: Get the company_id from the authenticated user
        Customer::where([
            'id' => $id,
            'company_id' => 1,
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

        // TODO: Get the user_id from the authenticated user
        Log::info('Customer updated: ' . $id . ', by: ' . 'Auth::user()->id');

    }

    public function destroy($id)
    {
        // TODO: Get the company_id from the authenticated user
        Customer::where([
            'id' => $id,
            'company_id' => 1,
        ])->delete();

        // TODO: Get the user_id from the authenticated user
        Log::info('Customer updated: ' . $id . ', by: ' . 'Auth::user()->id');

    }
}
