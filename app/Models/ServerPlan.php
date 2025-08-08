<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ServerPlan
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int $cpu
 * @property int $ram
 * @property int $storage
 * @property float $hourly_cost
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, RentedServer> $rentedServers
 * @property-read int|null $rented_servers_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan query()
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan whereCpu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan whereHourlyCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan whereRam($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan whereStorage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerPlan active()
 * @method static \Database\Factories\ServerPlanFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ServerPlan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'cpu',
        'ram',
        'storage',
        'hourly_cost',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'hourly_cost' => 'decimal:4',
        'is_active' => 'boolean',
        'cpu' => 'integer',
        'ram' => 'integer',
        'storage' => 'integer',
    ];

    /**
     * Get the rented servers for this plan.
     */
    public function rentedServers(): HasMany
    {
        return $this->hasMany(RentedServer::class);
    }

    /**
     * Scope a query to only include active plans.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}