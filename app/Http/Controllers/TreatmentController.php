<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\TreatmentRequest;
use App\Models\Treatment;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class TreatmentController extends Controller
{
    public function index()
    {
        $treatments = Treatment::where('company_id', 1)->get();

        $treatments = $treatments->map(function ($treatment) {
            return $treatment->formatForFrontend();
        });

        return Inertia::render('Dashboard/Treatments', [
            'treatments' => $treatments,
        ]);
    }

    public function store(TreatmentRequest $request)
    {
        $treatment = Treatment::create([
            'company_id' => Auth::user()->company->id,
            'name' => $request->name,
            'price' => $request->price,
        ]);

        Log::info('Treatment created: ' . $treatment->id);

    }

    public function update(TreatmentRequest $request, $id)
    {
        Treatment::where([
            'id' => $id,
            'company_id' => Auth::user()->company->id,
        ])->update([
            'name' => $request->name,
            'price' => $request->price,
        ]);

        Log::info('Treatment updated: ' . $id);

    }

    public function destroy($id)
    {
        Treatment::where([
            'id' => $id,
            'company_id' => Auth::user()->company->id,
        ])->delete();

        Log::info('Treatment deleted: ' . $id);

    }
}
