<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\View;
use Mpdf\Config\ConfigVariables;
use Mpdf\Config\FontVariables;
use Mpdf\Mpdf;

class MPdfController extends Controller
{
    public function generate()
    {
        $fileName = 'Sale_Invoice.pdf';
        $defaultConfig = (new ConfigVariables())->getDefaults();
        $fontDirs = $defaultConfig['fontDir'];
        $defaultFontConfig = (new FontVariables())->getDefaults();
        $fontData = $defaultFontConfig['fontdata'];

        $mpdf = new Mpdf([
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 15,
            'margin_bottom' => 20,
            'margin_header' => 10,
            'margin_footer' => 10,
            'fontDir' => array_merge($fontDirs, [
                resource_path('/fonts'),
            ]),
            'fontdata' => $fontData + [
                'solaimanlipi' => [
                    'R' => 'SolaimanLipi.ttf',
                    'I' => 'SolaimanLipi.ttf',
                    'useOTL' => 0xFF,
                    'useKashida' => 75
                ]
            ],
            'default_font' => 'solaimanlipi',
            'mode' => 'utf-8'
        ]);

        $html = View::make('invoice')->with('Title', 'বাংলা সাপোর্ট করে')->render();
        $mpdf->WriteHTML($html);
        $mpdf->Output($fileName, 'D');
    }
}
