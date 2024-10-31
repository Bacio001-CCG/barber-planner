<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:255'],
            'phone_number' => ['string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'kvk_number' => ['required', 'string', 'max:255'],
            'btw_number' => ['required', 'string', 'max:255'],
            'iban' => ['string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'strict' => ['boolean'],
        ];
    }
}
