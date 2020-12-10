<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DriverInvoiceResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'                => $this->id,
            'invoice'           => $this->invoice,
            'client'            => [
                'name'          => $this->client->name ?? ''
            ],
            'product'           => [
                'name'          => $this->product->name ?? ''
            ],
            'measurement_type'  => [
                'name'          => $this->measurement_type->name
            ],
            'driver_name'       => $this->driver_name,
            'created_at'        => $this->created_at,
            'container_height'  => $this->container_height,
            'container_length'  => $this->container_length,
            'container_breadth' => $this->container_breadth,
            'quantity'          => $this->quantity,
            'track_rent'        => $this->track_rent,
            'others'            => $this->others,
            'total'             => $this->total,
            'borrow'            => $this->borrow,
            'final'             => $this->final,
            'is_commission_added'   => $this->is_commission_added,
            'status'                => $this->status,
        ];
    }
}
