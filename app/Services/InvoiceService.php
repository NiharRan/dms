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
      $oldInvoice = substr($sale->invoice, 0, $len - 2);
      $id = substr($sale->invoice, $len - 2, $len);
      if (date('ymd') === $oldInvoice) {
        return $oldInvoice . ($id + 1);
      }else {
        return 'C' . date('ymd') . '01';
      }
    }else {
       return 'C' . date('ymd') . '01';
    }
  }

  public static function driver()
  {
    $driverInvoice = DriverInvoice::latest()->first();
    if ($driverInvoice) {
      $len =strlen($driverInvoice->invoice);
      $oldInvoice = substr($driverInvoice->invoice, 0, $len - 2);
      $id = substr($driverInvoice->invoice, $len - 2, $len);
      if (date('ymd') === $oldInvoice) {
        return $oldInvoice . ($id + 1);
      }else {
        return 'D' . date('ymd') . '01';
      }
    }else {
      return 'D' . date('ymd') . '01';
    }
  }
}
