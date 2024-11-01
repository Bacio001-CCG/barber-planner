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

Route::prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/agenda/{date?}', [AgendaController::class, 'index'])->name('agenda');
    Route::resource('agenda', AgendaController::class);
    Route::resource('customers', CustomerController::class);
    Route::resource('treatments', TreatmentController::class);
    Route::resource('bookkeeping', BookkeepingController::class);
    Route::resource('finish-appointment', FinishAppointmentController::class);
})->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
