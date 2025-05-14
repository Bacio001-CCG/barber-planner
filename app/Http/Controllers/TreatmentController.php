<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\TreatmentRequest;
use Illuminate\Support\Facades\Auth;
use App\Functions\Currency;
use App\Http\Services\TreatmentService;

class TreatmentController extends Controller
{

    public function __construct(
        protected TreatmentService $treatmentService,
    ) {}

    public function index()
    {
        $treatments = $this->treatmentService->getTreatments();

        $treatments = $treatments->map(function ($treatment) {
            return $treatment->formatForFrontend();
        });

        return Inertia::render('Dashboard/Treatments', [
            'treatments' => $treatments,
        ]);
    }

    public function store(TreatmentRequest $request)
    {
        $this->treatmentService->createTreatment([
            'company_id' => Auth::user()->company->id,
            'name' => $request->validated()['name'],
            'price' => Currency::convertToEuro($request->validated()['price']),
        ]);
    }

    public function update(TreatmentRequest $request, $id)
    {
        $this->treatmentService->updateTreatment([
            'id' => $id,
            'company_id' => Auth::user()->company->id,
        ], [
            'name' => $request->validated()['name'],
            'price' => Currency::convertToEuro($request->validated()['price']),
        ]);
    }

    public function destroy($id)
    {
        $this->treatmentService->deleteTreatment([
            'id' => $id,
            'company_id' => Auth::user()->company->id,
        ]);
    }
}
