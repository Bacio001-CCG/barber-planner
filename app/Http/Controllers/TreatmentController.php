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
        // TODO: Get the company_id from the authenticated user
        $treatment = Treatment::create([
            'company_id' => 1,
            'name' => $request->name,
            'price' => $request->price,
        ]);

        // TODO: Get the user_id from the authenticated user
        Log::info('Treatment created: ' . $treatment->id . ', by: ' . 'Auth::user()->id');

    }

    public function update(TreatmentRequest $request, $id)
    {
        // TODO: Get the company_id from the authenticated user
        Treatment::where([
            'id' => $id,
            'company_id' => 1,
        ])->update([
            'name' => $request->name,
            'price' => $request->price,
        ]);

        // TODO: Get the user_id from the authenticated user
        Log::info('Treatment updated: ' . $id . ', by: ' . 'Auth::user()->id');

    }

    public function destroy($id)
    {
        // TODO: Get the company_id from the authenticated user
        Treatment::where([
            'id' => $id,
            'company_id' => 1,
        ])->delete();

        // TODO: Get the user_id from the authenticated user
        Log::info('Treatment deleted: ' . $id . ', by: ' . 'Auth::user()->id');

    }
}
