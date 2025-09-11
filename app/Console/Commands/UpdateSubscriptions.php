<?php

namespace App\Console\Commands;

use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Console\Command;

class UpdateSubscriptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-subscriptions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();

        // Expires subscriptions
        $expiredCount = Subscription::where('status', 'active')
            ->where('end_date', '<', $now)
            ->update(['status' => 'expired']);

        $this->info("Assinaturas expiradas: $expiredCount");
    }
}
