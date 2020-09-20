<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    // Dashboard - Analytics
    public function index(){
        $pageConfigs = [
            'pageHeader' => false,
        ];

        return Inertia::render('Dashboard', [
          'pageConfigs' => $pageConfigs,
        ]);
    }

}

