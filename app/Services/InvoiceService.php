<?php


namespace App\Services;


use App\DriverInvoice;
use App\Sale;

class InvoiceService
{
  public static function sale()
  {
    $sale = Sale::latest()->first();
    if ($sale) {
      $len =strlen($sale->invoice);
      $oldInvoice = substr($sale->invoice, 2, $len - 5);
      $id = substr($sale->invoice, $len - 3, $len - 1);
      if (date('ymd') === $oldInvoice) {
        $id += 1;
        $id = sprintf("%'.03d", $id);
        return 'CI' . $oldInvoice . $id;
      }else {
        return 'CI' . date('ymd') . '001';
      }
    }else {
       return 'CI' . date('ymd') . '001';
    }
  }

  public static function driver()
  {
    $driverInvoice = DriverInvoice::latest()->first();
    if ($driverInvoice) {
      $len =strlen($driverInvoice->invoice);
      $oldInvoice = substr($driverInvoice->invoice, 2, $len - 5);
      $id = substr($driverInvoice->invoice, $len - 3, $len - 1);
      if (date('ymd') === $oldInvoice) {
        $id += 1;
        $id = sprintf("%'.03d", $id);
        return 'DI' . $oldInvoice . $id;
      }else {
        return 'DI' . date('ymd') . '001';
      }
    }else {
      return 'DI' . date('ymd') . '001';
    }
  }
}
