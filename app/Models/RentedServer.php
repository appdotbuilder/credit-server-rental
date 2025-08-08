<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\RentedServer
 *
 * @property int $id
 * @property int $user_id
 * @property int $server_plan_id
 * @property string $name
 * @property string|null $server_ip
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $started_at
 * @property \Illuminate\Support\Carbon|null $stopped_at
 * @property \Illuminate\Support\Carbon|null $terminated_at
 * @property float $total_cost
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User $user
 * @property-read ServerPlan $serverPlan
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Transaction> $transactions
 * @property-read int|null $transactions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer query()
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer whereServerIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer whereServerPlanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer whereStoppedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer whereTerminatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer whereTotalCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RentedServer active()
 * @method static \Database\Factories\RentedServerFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class RentedServer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'server_plan_id',
        'name',
        'server_ip',
        'status',
        'started_at',
        'stopped_at',
        'terminated_at',
        'total_cost',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'started_at' => 'datetime',
        'stopped_at' => 'datetime',
        'terminated_at' => 'datetime',
        'total_cost' => 'decimal:2',
    ];

    /**
     * Get the user that owns the server.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the server plan.
     */
    public function serverPlan(): BelongsTo
    {
        return $this->belongsTo(ServerPlan::class);
    }

    /**
     * Get the transactions for this server.
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Scope a query to only include active servers.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->whereIn('status', ['starting', 'running']);
    }
}