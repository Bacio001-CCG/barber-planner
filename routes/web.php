<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\TreatmentController;
use App\Http\Controllers\BookkeepingController;
use App\Http\Controllers\FinishAppointmentController;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\API\OpenStreetMapController;
use App\Http\Controllers\API\KVKController;
use App\Http\Controllers\LookupController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\PublicController;

// https://6pgtvzod03kv.share.zrok.io/oauth/google/callbacks
Route::get('/', [PublicController::class, 'index'])->name('public.index');

Route::prefix('dashboard')->middleware(['auth'])->name('dashboard.')->group(function () {
    Route::get('/agenda/{date?}', [AgendaController::class, 'index'])->name('agenda');
    Route::resource('agenda', AgendaController::class);
    Route::resource('customers', CustomerController::class);
    Route::resource('treatments', TreatmentController::class);
    Route::resource('bookkeeping', BookkeepingController::class);
    Route::resource('lookup', LookupController::class);
    Route::resource('finish-appointment', FinishAppointmentController::class);
    Route::resource('settings', SettingsController::class)->except(['create', 'store', 'destroy', 'show', 'edit']);
});

Route::prefix('api')->group(function () {
    Route::get('/kvk/{kvkNumber}', [KVKController::class, 'getKvkData']);
});

Route::prefix('api')->middleware(['auth'])->group(function () {
    Route::get('/address/search', [OpenStreetMapController::class, 'search']);
    Route::get('/address/distance/{appointmentId}', [OpenStreetMapController::class, 'getDistanceAppointment']);
});

require __DIR__.'/auth.php';
