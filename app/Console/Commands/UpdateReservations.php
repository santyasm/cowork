<?php

namespace App\Console\Commands;

use App\Models\Reservation;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Console\Command;


class UpdateReservations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-subscriptions-and-reservations';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Expires subscriptions and completes reservations according to the current timestamp';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();

        // Completes reservations
        $concludedCount = Reservation::where('status', 'active')
            ->where('end_time', '<', $now)
            ->update(['status' => 'completed']);

        $this->info("Reservas concluídas: $concludedCount");
    }
}
