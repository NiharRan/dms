<?php

namespace App\Http\Controllers\Settings;

use App\Http\Requests\Settings\ProductTypeRequest;
use App\Repositories\Settings\ProductTypeRepository;
use App\Settings\ProductType;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ProductTypeController extends Controller
{
  private $productTypeRepository;
  function __construct(ProductTypeRepository $productTypeRepository)
  {
    $this->productTypeRepository = $productTypeRepository;
  }

  /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $productTypes = $this->productTypeRepository->paginate(10);
      $breadcrumbs = [
        ['link'=>"/",'name'=>"Home"],['link'=>"",'name'=>"Product Types"]
      ];
      return Inertia::render('ProductType/Index', [
        'breadcrumbs' => $breadcrumbs,
        'product_types' => $productTypes,
        'has_modal' => true
      ]);
    }

  /**
   * Store a newly created resource in storage.
   *
   * @param ProductTypeRequest $request
   * @return \Illuminate\Http\Response
   */
  public function store(ProductTypeRequest $request)
  {
    $productType = $this->productTypeRepository->store();
    if ($productType) return redirect()
      ->route('product-types.index')
      ->with('success', "$productType->name created successfully!");
  }


  /**
   * Update the specified resource in storage.
   *
   * @param ProductTypeRequest $request
   * @param $id
   * @return \Illuminate\Http\Response
   */
  public function update(ProductTypeRequest $request, $id)
  {
    $productType = $this->productTypeRepository->update($id);
    if ($productType) {
      return redirect()
        ->route('product-types.index')
        ->with('success', 'Product type info updated successfully!');
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $productType = ProductType::find($id);
    $name = $productType->name;
    if ($productType->delete()) return redirect()
      ->route('product-types.index')
      ->with('success', "$name deleted successfully!");
  }
}
