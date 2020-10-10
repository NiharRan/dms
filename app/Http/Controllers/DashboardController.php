<?php

namespace App\Http\Controllers;

use App\DriverInvoice;
use App\Sale;
use App\Settings\Client;
use App\Settings\Product;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // Dashboard - Analytics
    public function index(){
        $pageConfigs = [
            'pageHeader' => false,
        ];
        $start_date = date('Y-m-d 00:00:00');
        $end_date = date('Y-m-d 23:59:59');
        $totalClients = Client::count();
        $totalProducts = Product::count();
        $todayDriverInvoice = DriverInvoice::whereBetween('created_at', [$start_date, $end_date])->sum('total');
        $todaySale = Sale::whereBetween('created_at', [$start_date, $end_date])->sum('total_price');
        $sales = Sale::with(['client'])->orderBy('id', 'DESC')->paginate(10);
        $driverInvoices = DriverInvoice::with(['client', 'product'])->orderBy('id', 'DESC')->paginate(10);
        return Inertia::render('Dashboard', [
          'pageConfigs' => $pageConfigs,
          'total_clients' => $totalClients,
          'total_products' => $totalProducts,
          'today_driver_invoice' => number_format($todayDriverInvoice),
          'today_sale' => number_format($todaySale),
          'sales' => $sales,
          'driver_invoices' => $driverInvoices,
        ]);
    }

}

