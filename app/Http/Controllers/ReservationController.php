<?php

namespace App\Http\Controllers;

use App\Http\Requests\CancelReservationRequest;
use App\Http\Requests\StoreReservationRequest;
use App\Models\Reservation;
use App\Models\Room;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function store(StoreReservationRequest $request)
    {
        $data = $request->validated();
        $user = Auth::user();

        try {
            $subscription = $this->getActiveSubscription($user);
            if (!$subscription) {
                return response()->json(['error' => 'Usuário não tem assinatura ativa.'], 403);
            }

            $room = Room::findOrFail($data['room_id']);
            [$start, $end, $hoursUsed] = $this->parseTimes($data);

            // Valida saldo de horas
            if (!$this->hasEnoughHours($subscription, $room->type, $hoursUsed)) {
                return back()->withErrors([
                    'error' => 'Saldo de horas insuficiente para este tipo de espaço.',
                ]);
            }

            // Valida conflitos
            if ($this->hasConflict($room, $start, $end)) {
                return back()->withErrors([
                    'error' => $room->type === 'desk'
                        ? 'Todas as mesas estão ocupadas neste horário.'
                        : 'Sala indisponível neste horário.',
                ]);
            }

            // Cria reserva
            Reservation::create([
                'user_id'    => $user->id,
                'room_id'    => $room->id,
                'start_time' => $data['start_time'],
                'end_time'   => $data['end_time'],
                'hours_used' => $hoursUsed,
                'status'     => 'active'
            ]);

            // Debita horas
            $this->decrementHours($subscription, $room->type, $hoursUsed);

            return redirect()->back()->with('success', 'Reserva criada com sucesso!');
        } catch (\Exception $ex) {
            return response()->json(['error' => 'Erro ao inserir reserva.', 'message' => $ex->getMessage()], 400);
        }
    }


    function cancel(CancelReservationRequest $request)
    {
        $data = $request->validated();

        try {
            $user = Auth::user();
            $reservation = Reservation::with('room')->findOrFail($data["reservation_id"]);
            $hours_used = $reservation->hours_used;
            $reservationRoomType = $reservation->room->type;
            $userSubscription = $user->subscriptions->where("status", "active")->first();

            $reservation->update([
                "status" => "canceled"
            ]);

            if ($reservationRoomType === "desk") {
                $userSubscription->increment("remaining_hours_desk", $hours_used);
            } else {
                $userSubscription->increment("remaining_hours_room", $hours_used);
            }

            return redirect()->back()->with('success', 'Reserva cancelada com sucesso!');
        } catch (\Exception $ex) {
            return response()->json(['error' => 'Erro ao cancelar reserva.', 'message' => $ex->getMessage()], 400);
        }
    }

    /**
     * auxiliares
     */
    private function getActiveSubscription($user)
    {
        return $user->subscriptions()->where('status', 'active')->first();
    }

    private function parseTimes(array $data): array
    {
        $start = Carbon::parse($data['start_time']);
        $end   = Carbon::parse($data['end_time']);
        $hours = $start->diffInHours($end);

        return [$start, $end, $hours];
    }

    private function hasEnoughHours($subscription, string $roomType, int $hoursUsed): bool
    {
        return match ($roomType) {
            'desk'        => $subscription->remaining_hours_desk >= $hoursUsed,
            'room',
            'auditorium'  => $subscription->remaining_hours_room >= $hoursUsed,
            default       => false,
        };
    }

    private function hasConflict(Room $room, Carbon $start, Carbon $end): bool
    {
        $query = Reservation::where('room_id', $room->id)
            ->where('status', 'active')
            ->where(function ($q) use ($start, $end) {
                $q->whereBetween('start_time', [$start, $end])
                    ->orWhereBetween('end_time', [$start, $end])
                    ->orWhere(function ($q2) use ($start, $end) {
                        $q2->where('start_time', '<=', $start)
                            ->where('end_time', '>=', $end);
                    });
            });

        if ($room->type === 'desk') {
            return $query->count() >= 20;
        }

        return $query->exists();
    }

    private function decrementHours($subscription, string $roomType, int $hoursUsed): void
    {
        $field = $roomType === 'desk' ? 'remaining_hours_desk' : 'remaining_hours_room';
        $subscription->decrement($field, $hoursUsed);
    }
}
