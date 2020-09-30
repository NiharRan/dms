<?php

namespace App\Http\Controllers;

use App\Repositories\CompanyRepository;
use Inertia\Inertia;

class CompanyProfileController extends Controller
{
  protected $companyRepository;
  public function __construct(CompanyRepository $companyRepository)
  {
    $this->companyRepository = $companyRepository;
  }

  public function show(string $slug)
  {
    $company = $this->companyRepository->findBySlug($slug);
    $pageConfigs = [
      'pageHeader' => true
    ];
    $breadcrumbs = [
      ['link'=>"/",'name'=> __('Home')],
      ['name'=>  $company->name],
    ];

    return Inertia::render('Company/Profile', [
      'company' => $company,
      'breadcrumbs'=> $breadcrumbs,
      'has_modal' => false
    ]);
  }
}
