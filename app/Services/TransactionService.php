<?php


namespace App\Services;

use App\Sale;
use App\Settings\TransactionType;

class TransactionService
{
    public static function createFromSale(Sale $sale)
    {
        $user = auth()->user();
        $transactionType = TransactionType::where('name', '=', 'In')->first();

        return $sale->transactions()->create([
            'transaction_type_id' => $transactionType->id,
            'amount' => $sale->total_paid,
            'user_id' => $user->id,
            'transaction_media_id' => $sale->transaction_media_id,
            'description' => $sale->description,
        ]);
    }

    public static function updateFromSale(Sale $sale)
    {
        $sale->transactions()->delete();
        return self::createFromSale($sale);
    }
}