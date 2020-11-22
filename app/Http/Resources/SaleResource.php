<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource
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
            'invoice'     => $this->invoice,
            'total_price' => $this->total_price,
            'total_paid'  => $this->total_paid,
            'commission'   => $this->commission,
            'sale_date'   => $this->sale_date,
            'status'      => $this->status,
            'client'      => [
                'name'    => $this->client->name ?? ''
            ],
            'creator'      => [
                'name'    => $this->creator->name ?? ''
            ]
        ];
    }
}
