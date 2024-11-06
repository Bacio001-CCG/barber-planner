<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use App\Models\User;

class RegisterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone_number' => 'required|string|max:255',

            'company_kvk_number' => 'required|string|digits:8',
            'company_name' => 'required|string|max:255',
            'company_location' => 'required|string|max:255',
            'company_address' => 'required|string|max:255',
            'company_postal_code' => 'required|string|max:255',
            'company_phone_number' => 'required|string|max:255',
            'company_email' => 'required|string|lowercase|email|max:255',
            'company_btw_number' => 'required|string|max:14',
            'company_type' => 'required|string|in:BV,Eenmanszaak,V.O.F.',
        ];
    }
}
