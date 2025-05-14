<?php

namespace App\Http\Services;

use App\Models\Treatment;

class TreatmentService {

    public function __construct(
        protected Treatment $treatment,
    ) {}
}