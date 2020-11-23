<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'      => $this->id,
            'amount' => $this->amount,
            'description'  => $this->description,
            'created_at'   => $this->created_at,
            'status'      => $this->status,
            'media'      => [
                'name'    => $this->media->name ?? ''
            ],
            'creator'      => [
                'name'    => $this->creator->name ?? ''
            ],
            'transaction_type'      => [
                'name'    => $this->transaction_type->name ?? ''
            ],
            'transactionable'      => [
                'invoice'    => $this->transactionable->invoice ?? '',
                'id'    => $this->transactionable->id ?? '',
            ]
        ];
    }
}
