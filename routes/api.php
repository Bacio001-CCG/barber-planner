<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ValidateController;

Route::get('/address/search', [ValidateController::class, 'search']);
Route::get('/address/distance/{appointmentId}', [ValidateController::class, 'getDistanceAppointment']);
Route::get('/kvk/{kvkNumber}', [ValidateController::class, 'getKvkData']);
