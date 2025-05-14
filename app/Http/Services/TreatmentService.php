<?php

namespace App\Http\Services;

use App\Models\Treatment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;

class TreatmentService
{

    public function __construct(
        protected Treatment $treatmentModel,
    ) {}

    public function getTreatments(): Collection
    {
        return $this->treatmentModel->where('company_id', Auth::user()->company->id)->get();
    }

    public function updateTreatment(array $filter, array $data)
    {
        return $this->treatmentModel->where($filter)->update($data);
    }

    public function createTreatment(array $data)
    {
        $this->treatmentModel->create($data);
    }

    public function deleteTreatment(array $filter)
    {
        return $this->treatmentModel->where($filter)->delete();
    }
}
