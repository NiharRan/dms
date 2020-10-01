<?php


namespace App\Services;


use App\Sale;

class SaleInvoiceService
{
  public static function generate()
  {
    $sale = Sale::latest()->first();
    if ($sale) {
      $expNum = explode('-', $sale->invoice);

      if (date('l', strtotime(date('Y-01-01')))) {
        $nextInvoiceNumber = date('Y') . '-0001';
      }else {
        $nextInvoiceNumber = $expNum[0] . '-' . $expNum[1] + 1;
      }
    }else {
      $nextInvoiceNumber = date('Y') . '-0001';
    }

    return $nextInvoiceNumber;
  }
}
