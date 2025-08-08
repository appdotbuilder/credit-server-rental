<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\UserCredit
 *
 * @property int $id
 * @property int $user_id
 * @property float $balance
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|UserCredit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserCredit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserCredit query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserCredit whereBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserCredit whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserCredit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserCredit whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserCredit whereUserId($value)
 * @method static \Database\Factories\UserCreditFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class UserCredit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'balance',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'balance' => 'decimal:2',
    ];

    /**
     * Get the user that owns the credits.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}