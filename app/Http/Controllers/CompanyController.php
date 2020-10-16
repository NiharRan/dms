<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Repositories\CompanyRepository;
use App\Services\ConstDataTypeService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;

class CompanyController extends Controller
{
    protected $companyRepository;
    public function __construct(CompanyRepository $companyRepository)
    {
      $this->companyRepository = $companyRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $pageConfigs = [
        'pageHeader' => true
      ];
      $breadcrumbs = [
        ['link'=>"/",'name'=> __('Home')],
        ['name'=> __("Companies") ],
      ];
      $companies = $this->companyRepository->paginate(request()->per_page);

      return Inertia::render('Company/Index', [
        'breadcrumbs' => $breadcrumbs,
        'companies' => $companies,
        'has_modal' => true
      ]);
    }

  /**
   * Store a newly created resource in storage.
   *
   * @param CompanyRequest $request
   * @return Response
   */
  public function store(CompanyRequest $request)
  {
    $company = $this->companyRepository->store($request);
    if ($request->hasFile('logo')) {
      $extension = $request->file('logo')->extension();
      //filename to store
      $fileNameToStore = \time().'.'.$extension;

      //Upload File
      $this->companyRepository->uploadImage($fileNameToStore, $request, $company->id);

      $company = $this->companyRepository->storeImage($company, $fileNameToStore, 1); // 1 => profileImage
    }
    if ($company) {
      return redirect()
        ->route('companies.index')
        ->with('success', 'Company registration completed successfully!');
    }
  }

  /**
   * Update the specified resource in storage.
   *
   * @param CompanyRequest $request
   * @param int $id
   * @return Response
   */
  public function update(CompanyRequest $request, $id)
  {
    $company = $this->companyRepository->update($request, $id);
    // new image provided
    if ($request->hasFile('logo')) {
      $extension = $request->file('logo')->extension();
      //filename to store
      $fileNameToStore = \time().'.'.$extension;

      //Upload File
      $this->companyRepository->uploadImage($fileNameToStore, $request, $id);

      $this->companyRepository->updateImageStatus($company, 1); // 1 => profileImage
      $company = $this->companyRepository->storeImage($company, $fileNameToStore, 1);// 1 => profileImage
    }
    if ($company->save()) {
      return redirect()
        ->route('companies.index')
        ->with('success', "$company->name's information updated successfully!");
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function destroy($id)
  {
    //
  }
}
