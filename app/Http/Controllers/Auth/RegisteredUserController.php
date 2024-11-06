<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\Company;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\API\OpenStreetMapController;
use Illuminate\Support\Facades\Log;

class RegisteredUserController extends Controller
{

    
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request): RedirectResponse
    {

        $openStreetMapController = new OpenStreetMapController();
        $addressSearch = $openStreetMapController->_fetchAddressData($request->company_address);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
        ]);

        $company = Company::create([
            'user_id' => $user->id,
            'name' => $request->company_name,
            'location' => $request->company_location,
            'address' => $request->company_address,
            'postal_code' => $request->company_postal_code,
            'phone_number' => $request->company_phone_number,
            'email' => $request->company_email,
            'kvk_number' => $request->company_kvk_number,
            'btw_number' => $request->company_btw_number,
            'type' => $request->company_type,
            'osm_id' => $addressSearch['osm_id'],
        ]);

        event(new Registered($user));

        Auth::login($user);

        Log::info('Registration: '. Auth::user()->id);

        return redirect(route('dashboard.agenda.index', absolute: false));
    }
}
