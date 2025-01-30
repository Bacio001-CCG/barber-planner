<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FinishedAppointmentRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'appointment_id' => ['required', 'integer'],
            'price' => ['required', 'numeric'],
            'tip' => ['nullable', 'numeric'],
            'payment_type' => ['required', 'string', 'in:cash,card'],
            'distance' => ['integer'],
        ];
    }
}
