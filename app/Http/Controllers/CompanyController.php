<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Company');
    }

    public function store(CompanyRequest $request)
    {
        $company = Company::create([
            'user_id' => Auth::user()->id,
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'location' => $request->location,
            'postal_code' => $request->postal_code,
            'kvk_number' => $request->kvk_number,
            'btw_number' => $request->btw_number,
            'iban' => $request->iban,
            'type' => $request->type,
            'strict' => $request->strict,
        ]);

        Log::info('Company created: ' . $company->id . ', by: ' . Auth::user()->id);

    }

    public function update(CompanyRequest $request, $id)
    {
        Company::where([
            'id' => $id,
            'user_id' => Auth::user()->id,
        ])->create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'location' => $request->location,
            'postal_code' => $request->postal_code,
            'kvk_number' => $request->kvk_number,
            'btw_number' => $request->btw_number,
            'iban' => $request->iban,
            'type' => $request->type,
            'strict' => $request->strict,
        ]);

        Log::info('Company updated: ' . $id . ', by: ' . Auth::user()->id);

    }

    public function destroy($id)
    {
        Company::where([
            'id' => $id,
            'user_id' => Auth::user()->id,
        ])->delete();

        Log::info('Company deleted: ' . $id . ', by: ' . Auth::user()->id);
    }
}
