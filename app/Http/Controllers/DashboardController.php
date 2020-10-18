<?php

namespace App\Http\Controllers;

use App\DriverInvoice;
use App\Sale;
use App\Services\StockService;
use App\Settings\Client;
use App\Settings\Product;
use App\Settings\Stock;
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

        $stocks = Stock::with(['stock_details'])->active()->get();
        foreach ($stocks as $key => $stock) {
            $stocks[$key]->products = StockService::products($stock->id);
        }
        $stockCharts = [];
        foreach ($stocks as $key => $stock) {
            if (count($stock->products) > 0) {
                $labels = array_map(function ($product) {
                    return $product->name;
                }, $stock->products);
                $stockCharts[$key]['labels'] = $labels;
                $data = [];
                foreach ($stock->stock_details as $stock_detail) {
                    $data[] = $stock_detail->quantity;
                }
                $dataset = [
                    'label' => $stock->name,
                    'data' => $data
                ];
                $stockCharts[$key]['datasets'] = $dataset;
            }
        }

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
          'stockCharts' => $stockCharts,
          'driver_invoices' => $driverInvoices,
        ]);
    }

}

