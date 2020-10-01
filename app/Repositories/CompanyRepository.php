<?php


namespace App\Repositories;


use App\Company;
use App\Traits\RepositoryTrait;
use App\Users\Address;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class CompanyRepository
{
  use RepositoryTrait;

  private $company;
  protected $guarded = [];

  public function __construct(Company $company)
  {
    $this->company = $company;
  }

  public function all()
  {
    $companies = $this->company
      ->with(['logo', 'phones'])
      ->where('id', '!=', auth()->user()->id);

    if (\request()->has('status')) {
      $companies = $companies->where('status', \request()->status);
    }

    if (\request()->has('slug')) {
      $companies = $companies->where('slug', \request()->slug);
    }

    if (\request()->has('search')) {
      $search = \request()->search;
      $companies = $companies->where('name', 'like', "%$search")
        ->orWhere('owner', 'like', "%$search")
        ->orWhere('phone', 'like', "%$search")
        ->orWhere('email', 'like', "%$search");
    }
    return $companies->orderBy('name', 'asc');
  }

  public function findById($rowId)
  {
    return $this->company->with(['images', 'logo', 'phones'])->find($rowId);
  }

  public function findBySlug(string $slug)
  {
    return $this->company->with(['images', 'logo', 'phones'])
      ->where('slug', $slug)->first();
  }

  public function store(Request $request)
  {
    $company = new Company;
    $company = $this->setupData($company, $request);
    $company->created_at = date('Y-m-d H:i:s');
    if ($company->save()) {
      return $company;
    }
    return null;
  }

  public function update(Request $request, $id)
  {
    $company = $this->findById($id);
    $company = $this->setupData($company, $request);
    $company->status = filter_var($request->status, FILTER_VALIDATE_BOOLEAN) ;
    if ($company->save()) {
      return $company;
    }
    return null;
  }

  private function setupData(Company $company, $request)
  {
    $company->name = $request->name;
    $company->slug = make_slug($request->name);
    $company->description = $request->description;
    $company->owner = $request->owner;
    $company->email = $request->email;
    $company->head_office = $request->head_office;
    $company->dipu_office = $request->dipu_office;
    $company->address = $request->address;
    $company->sales_center = $request->sales_center;

    $phones = explode(',', $request->phones);
    if (sizeof($phones) > 0) {
      foreach ($phones as $phone) {
        $company->phones()->create([
          'phone' => $phone,
        ]);
      }
    }
    return $company;
  }

  /**
   * Create a thumbnail of specified size
   *
   * @param string $path path of thumbnail
   * @param int $width
   * @param int $height
   */
  public function createThumbnail($path, $width, $height)
  {
    $img = Image::make($path)->resize($width, $height, function ($constraint) {
      $constraint->aspectRatio();
    });
    $img->save($path);
  }

  public function updateImageStatus(Company $company, $image_type)
  {
    if ($company->images()
      ->where('image_type', $image_type)
      ->update(['status' => 0])) {
      return $company;
    }
    return null;
  }

  public function storeImage(Company $company, string $fileName, $image_type)
  {
    return $company->images()->create([
      'name' => $fileName,
      'image_type' => $image_type,
      'status' => 1
    ]);
  }


  private function setupAddress(Address $address, Request $request)
  {
    $address->address = $request->address;
    $address->division_id = $request->division_id;
    $address->district_id = $request->district_id;
    $address->upazilla_id = $request->upazilla_id;
    return $address;
  }

  public function uploadImage(string $fileNameToStore, $request, $companyId)
  {

    $request->file('logo')->storeAs('public/companies/'.$companyId, $fileNameToStore);
    $request->file('logo')->storeAs('public/companies/'.$companyId.'/thumbnail/small', $fileNameToStore);
    $request->file('logo')->storeAs('public/companies/'.$companyId.'/thumbnail/medium', $fileNameToStore);

    //create small thumbnail
    $smallThumbnailPath = public_path('storage/companies/'.$companyId.'/thumbnail/small/'.$fileNameToStore);
    $this->createThumbnail($smallThumbnailPath, 150, 93);

    //create medium thumbnail
    $mediumThumbnailPath = public_path('storage/companies/'.$companyId.'/thumbnail/medium/'.$fileNameToStore);
    $this->createThumbnail($mediumThumbnailPath, 300, 185);
  }


}
