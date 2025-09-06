<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'room_id' => 'required|exists:rooms,id',
            'start_time' => 'required|date|after_or_equal:now',
            'end_time' => 'required|date|after:start_time',
        ];
    }

    public function messages(): array
    {
        return [
            'room_id.required'   => 'A sala é obrigatória.',
            'room_id.exists'     => 'Sala inválida.',
            'start_time.required' => 'O horário de início é obrigatório.',
            'start_time.date'    => 'O horário de início deve ser uma data válida.',
            'start_time.after_or_equal' => 'O horário de início deve ser igual ou posterior ao momento atual.',
            'end_time.required'  => 'O horário de término é obrigatório.',
            'end_time.date'      => 'O horário de término deve ser uma data válida.',
            'end_time.after'     => 'O horário de término deve ser posterior ao horário de início.',
        ];
    }
}
