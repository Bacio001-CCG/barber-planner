<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\CustomerRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\CustomerService;

class CustomerController extends Controller
{

    public function __construct(
        protected CustomerService $customerService,
    ) {}

    public function index()
    {
        $customers = $this->customerService->getCustomers();

        $customers = $customers->map(function ($customer) {
            return $customer->formatForFrontend();
        });

        return Inertia::render('Dashboard/Customers', [
            'customers' => $customers,
        ]);
    }

    public function store(CustomerRequest $request)
    {
        $this->customerService->createCustomer([
            'company_id' => Auth::user()->company->id,
            'first_name' => $request->validated()['first_name'],
            'infix' => $request->validated()['infix'],
            'last_name' => $request->validated()['last_name'],
            'email' => $request->validated()['email'],
            'phone_number' => $request->validated()['phone_number'],
            'address' => $request->validated()['address'],
            'location' => $request->validated()['location'],
            'postal_code' => $request->validated()['postal_code'],
            'notes' => $request->validated()['notes'] ?? null,
        ]);
    }

    public function update(CustomerRequest $request, $id)
    {
        $this->customerService->updateCustomer([
            'id' => $id,
            'company_id' => Auth::user()->company->id,
        ], [
            'first_name' => $request->validated()['first_name'],
            'infix' => $request->validated()['infix'],
            'last_name' => $request->validated()['last_name'],
            'email' => $request->validated()['email'],
            'phone_number' => $request->validated()['phone_number'],
            'address' => $request->validated()['address'],
            'location' => $request->validated()['location'],
            'postal_code' => $request->validated()['postal_code'],
            'notes' => $request->validated()['notes'] ?? null,
        ]);
    }

    public function destroy($id)
    {
        $this->customerService->deleteCustomer([
            'id' => $id,
            'company_id' => Auth::user()->company->id,
        ])->delete();
    }
}
