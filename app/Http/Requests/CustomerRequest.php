<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'infix' => ['string', 'max:255', 'nullable'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['email', 'max:255', 'nullable'],
            'phone_number' => ['string', 'max:255', 'nullable'],
            'address' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:255'],
            'osm_id' => ['nullable', 'string'],
        ];
    }
}
