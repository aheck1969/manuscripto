<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'first_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults()],
            'preferred_language' => ['nullable', 'string', 'in:en,de,fr,es,it,pt,nl,pl'],
            'timezone' => ['nullable', 'string', 'max:255'],
            'writing_goal_daily' => ['nullable', 'integer', 'min:1', 'max:10000'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'email.unique' => trans('messages.auth.email_already_taken'),
            'password.confirmed' => trans('messages.auth.password_confirmation_mismatch'),
            'preferred_language.in' => trans('messages.auth.invalid_language'),
            'writing_goal_daily.min' => trans('messages.auth.writing_goal_too_low'),
            'writing_goal_daily.max' => trans('messages.auth.writing_goal_too_high'),
        ];
    }
}