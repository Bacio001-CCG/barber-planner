<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppointmentRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules():array
    {
        return [
            'type' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'time' => ['required', 'date_format:H:i'],
            'notes' => ['nullable', 'string'],
            'customers' => [
                'array',
                'required_if:type,business',
                function ($attribute, $value, $fail) {
                    if (request('type') === 'business' && (!is_array($value) || count($value) < 1)) {
                        $fail('The ' . $attribute . ' must have at least one item if type is business.');
                    }
                },
            ],
            'treatments' => [
                'array',
                'required_if:type,business',
                function ($attribute, $value, $fail) {
                    if (request('type') === 'business' && (!is_array($value) || count($value) < 1)) {
                        $fail('The ' . $attribute . ' must have at least one item if type is business.');
                    }
                },
            ],
        ];
    }
    
}
