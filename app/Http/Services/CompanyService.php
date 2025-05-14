<?php

namespace App\Http\Services;

use App\Models\Company;
use Illuminate\Support\Facades\Log;

class CompanyService
{

    public function __construct(
        protected Company $companyModel,
    ) {}

    public function updateCompany(array $filter, array $data)
    {
        return $this->companyModel->where($filter)->update($data);
    }

    public function createCompany(array $data)
    {
        $this->companyModel->create($data);
    }

    public function deleteCompany(int $id)
    {
        return $this->companyModel->where('id', $id)->delete();
    }
}
