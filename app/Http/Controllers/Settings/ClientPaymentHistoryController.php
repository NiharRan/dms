<?php

namespace App\Http\Controllers\Settings;

use App\Company;
use App\Http\Controllers\Controller;
use App\Http\Requests\ClientBalanceHistoryRequest;
use App\Settings\client;
use Inertia\Inertia;

class ClientPaymentHistoryController extends Controller
{
    public function store(ClientBalanceHistoryRequest $request)
    {
        $client = client::find($request->client_id);
        $balanceHistory = $client->balance_histories()->create([
            'amount' => $request->amount,
            'description' => strtoupper($request->description),
            'type' => 'In',
            'status' => 1,
            'created_at' => date('Y-m-d H:i:s', strtotime($request->created_at))
        ]);

        $client->balance += $request->amount;
        $client->save();

        if ($balanceHistory) return redirect()->route('clients.index')->with('success', 'Client balance info stored successfully');
    }
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
