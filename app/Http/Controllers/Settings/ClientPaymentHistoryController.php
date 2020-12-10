<?php

namespace App\Http\Controllers\Settings;

use App\Company;
use App\Http\Controllers\Controller;
use App\Settings\client;
use Inertia\Inertia;

class ClientPaymentHistoryController extends Controller
{
    public function show($clientId)
    {
        $client = client::find($clientId);
        $balance_histories = $client->balance_histories()
            ->orderBy('id', 'DESC')->paginate(20);

        $breadcrumbs = [
            ['link' => "/", 'name' => "Home"],
            ['link' => route('clients.index'), 'name' => "Clients"],
            ['link' => '', 'name' => "History"],
        ];
        return Inertia::render('Client/History', [
            'breadcrumbs' => $breadcrumbs,
            'client' => $client,
            'balance_histories' => $balance_histories,
            'has_modal' => true
        ]);
    }


    public function print($clientId)
    {
        $company = Company::active()->orderBy('id', 'desc')->first();
        $client = client::find($clientId);
        $balance_histories = $client->balance_histories()
            ->orderBy('id', 'DESC')->get();

        return Inertia::render('Client/Print', [
            'company' => $company,
            'client' => $client,
            'balance_histories' => $balance_histories,
        ]);
    }
}
