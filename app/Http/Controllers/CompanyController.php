<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\CompanyService;

class CompanyController extends Controller
{

    public function __construct(
        protected CompanyService $companyService,
    ) {}

    public function index()
    {
        return Inertia::render('Dashboard/Company');
    }

    public function store(CompanyRequest $request)
    {

        $this->companyService->createCompany([
            'user_id' => Auth::user()->id,
            'name' => $request->validated()['name'],
            'email' => $request->validated()['email'],
            'phone_number' => $request->validated()['phone_number'],
            'address' => $request->validated()['address'],
            'location' => $request->validated()['location'],
            'postal_code' => $request->validated()['postal_code'],
            'kvk_number' => $request->validated()['kvk_number'],
            'btw_number' => $request->validated()['btw_number'],
            'iban' => $request->validated()['iban'],
            'type' => $request->validated()['type'],
            'strict' => $request->validated()['strict'],
        ]);
    }

    public function update(CompanyRequest $request, $id)
    {
        $this->companyService->updateCompany([
            'id' => $id,
            'user_id' => Auth::user()->id,
        ], [
            'name' => $request->validated()['name'],
            'email' => $request->validated()['email'],
            'phone_number' => $request->validated()['phone_number'],
            'address' => $request->validated()['address'],
            'location' => $request->validated()['location'],
            'postal_code' => $request->validated()['postal_code'],
            'kvk_number' => $request->validated()['kvk_number'],
            'btw_number' => $request->validated()['btw_number'],
            'iban' => $request->validated()['iban'],
            'type' => $request->validated()['type'],
            'strict' => $request->validated()['strict'],
        ]);
    }

    public function destroy($id)
    {
        $this->companyService->deleteCompany($id);
    }
}
