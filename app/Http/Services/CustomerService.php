<?php

namespace App\Http\Services;

use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;

class CustomerService
{

    public function __construct(
        protected Customer $customerModel,
    ) {}

    public function getCustomers(): Collection
    {
        return $this->customerModel->where('company_id', Auth::user()->company->id)->get();
    }

    public function updateCustomer(array $filter, array $data)
    {
        return $this->customerModel->where($filter)->update($data);
    }

    public function createCustomer(array $data)
    {
        $this->customerModel->create($data);
    }

    public function deleteCustomer(array $filter)
    {
        return $this->customerModel->where($filter)->delete();
    }
}
