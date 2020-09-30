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

    return Inertia::render('Company/Profile', [
      'company' => $company,
    ]);
  }
}
