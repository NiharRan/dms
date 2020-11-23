<?php

namespace App\Http\Controllers;

use App\Repositories\SaleRepository;
use App\Services\TransactionService;
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
        ['link'=>"/",'name'=> __('Home')],
        ['link'=> route('sales.index'), 'name'=> __("Sales") ],
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

    public function pay(Request $request, $invoice)
    {
      $sale = $this->saleRepository->findByInvoice($invoice);
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
