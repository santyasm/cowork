<?php

namespace App\Http\Requests;

use App\Models\Reservation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

class CancelReservationRequest extends FormRequest
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
            "reservation_id" => "required|exists:reservations,id"
        ];
    }

    public function messages(): array
    {
        return [
            "reservation_id.required" => "Informe a reserva que deseja cancelar.",
            "reservation_id.exists" => "Reserva inválida.",

        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $reservationId = $this->input('reservation_id');
            $reservation = Reservation::find($reservationId);

            if ($reservation && $reservation->start_time <= Carbon::now()) {
                $validator->errors()->add('reservation_id', 'Não é possível cancelar reservas que já começaram.');
            }
        });
    }
}
