<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingsController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Dashboard/Settings', [
            'settings' => Auth::user()->company->setting->formatForFrontend()
        ]);
    }

    public function update(Request $request, $setting)
    {
        $company = Auth::user()->company;
        $company->setting->update($request->all());
    }

}
