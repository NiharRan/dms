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
      $oldInvoice = substr($sale->invoice, 1, $len - 4);
      $id = substr($sale->invoice, $len - 3, $len - 1);
      if (date('ymd') === $oldInvoice) {
        $id += 1;
        $id = sprintf("%'.03d", $id);
        return 'S' . $oldInvoice . $id;
      }else {
        return 'S' . date('ymd') . '001';
      }
    }else {
       return 'S' . date('ymd') . '001';
    }
  }

  public static function driver()
  {
    $driverInvoice = DriverInvoice::latest()->first();
    if ($driverInvoice) {
      $len =strlen($driverInvoice->invoice);
      $oldInvoice = substr($driverInvoice->invoice, 1, $len - 4);
      $id = substr($driverInvoice->invoice, $len - 2, $len - 1);
      if (date('ymd') === $oldInvoice) {
        $id += 1;
        $id = sprintf("%'.03d", $id);
        return 'D' . $oldInvoice . $id;
      }else {
        return 'D' . date('ymd') . '001';
      }
    }else {
      return 'D' . date('ymd') . '001';
    }
  }
}