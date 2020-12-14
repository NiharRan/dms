<?php

namespace App\Http\Controllers;

use App\Http\Requests\DuePaymentRequest;
use App\Repositories\SaleRepository;
use App\Services\TransactionService;
use App\Settings\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleInvoiceController extends Controller
{
  protected $saleRepository;
  public function __construct(SaleRepository $saleRepository)
  {
    $this->saleRepository = $saleRepository;
  }

  public function show($invoice)
  {
    $sale = $this->saleRepository->findByInvoice($invoice);
    $pageConfigs = [
      'pageHeader' => true
    ];
    $breadcrumbs = [
      ['link' => "/", 'name' => __('Home')],
      ['link' => route('sales.index'), 'name' => __("Sales")],
      ['name' => __("Invoice: $sale->invoice")]
    ];

    return Inertia::render('Sale/Invoice', [
      'sale' => $sale,
      'breadcrumbs' => $breadcrumbs,
      'link' => route('sales.index')
    ]);
  }

  public function print($invoice)
  {
    $sale = $this->saleRepository->findByInvoice($invoice);
    return Inertia::render('Sale/Print', [
      'sale' => $sale,
    ]);
  }

  public function pay(DuePaymentRequest $request, $invoice)
  {
    $sale = $this->saleRepository->findByInvoice($invoice);
    if ($request->payment_from_balance) {
      $client = Client::find($request->client_id);
      $balance_decrease = 0;
      if ($client->balance >= $request->amount) {
        $balance_decrease = $request->amount;
        $client->balance = $client->balance - $request->amount;
        $client->save();

        if ($balance_decrease > 0) {
          $balance = number_format($balance_decrease, 2);
          $client->balance_histories()->create([
            'amount' => $balance_decrease,
            'description' => "$client->name, বিক্রয় রশিদ - $sale->invoice এর বিপরীতে আপনার হিসাব থেকে $balance টাকা খরচ হয়েছে",
            'type' => 'Out',
            'status' => 1,
            'created_at' => date('Y-m-d H:i:s')
          ]);
        }
        $sale->is_paid_from_balance = 1;
      }else {
        return redirect()->back()->with('error', "$client->name এর একাউন্টে যথেষ্ট পরিমাণ টাকা নেই। একাউন্ট থেকে বাকি পরিসুদ সম্ভব নয়");
      }
    }
    $sale->total_paid += $request->amount;
    $sale->total_due -= $request->amount;
    if ($sale->total_due == 0) {
      $sale->status = 1;
    }
    if ($sale->save()) {
      TransactionService::createFromSale($sale, $request->amount);
      return redirect()->back()->with('success', 'Sale payment done!');
    }
  }
}
