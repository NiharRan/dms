<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProductRequest;
use App\Repositories\Settings\ProductRepository;
use App\Settings\Product;
use App\Settings\ProductType;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
  private $productRepository;
  function __construct(ProductRepository $productRepository)
  {
    $this->productRepository = $productRepository;
  }

  /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $products = $this->productRepository->paginate(request()->per_page);
      $product_types = ProductType::active()->orderBy('name')->get();
      $breadcrumbs = [
        ['link'=>"/",'name'=>"Home"],['link'=>"",'name'=>"Products"]
      ];
      return Inertia::render('Product/Index', [
        'breadcrumbs' => $breadcrumbs,
        'products' => $products,
        'product_types' => $product_types,
        'has_modal' => true
      ]);
    }

  /**
   * Store a newly created resource in storage.
   *
   * @param ProductRequest $request
   * @return \Illuminate\Http\Response
   */
  public function store(ProductRequest $request)
  {
    $product = $this->productRepository->store($request);

    if ($request->hasFile('image')) {
      $extension = $request->file('image')->extension();
      //filename to store
      $fileNameToStore = \time().'.'.$extension;

      //Upload File
      $this->productRepository->uploadImage($fileNameToStore, $request);

      $product->image = $fileNameToStore;
    }
    if ($product->save()) return redirect()
      ->route('products.index')
      ->with('success', "$product->name created successfully!");
  }


  /**
   * Update the specified resource in storage.
   *
   * @param ProductRequest $request
   * @param $id
   * @return \Illuminate\Http\Response
   */
  public function update(ProductRequest $request, $id)
  {
    $product = $this->productRepository->update($request, $id);

    // new image provided
    if ($request->hasFile('image')) {
      if ($product->image !== 'default.jpg') {
        $originalImagePath = 'public/products/'.$product->image;
        $smallImagePath = 'public/products/thumbnail/small/'.$product->image;
        $mediumImagePath = 'public/products/thumbnail/medium/'.$product->image;

        Storage::delete($originalImagePath);
        Storage::delete($smallImagePath);
        Storage::delete($mediumImagePath);
      }

      $extension = $request->file('image')->extension();
      //filename to store
      $fileNameToStore = \time().'.'.$extension;

      //Upload File
      $this->productRepository->uploadImage($fileNameToStore, $request);

      $product->image = $fileNameToStore;
    }
    if ($product->save()) {
      return redirect()
        ->route('products.index')
        ->with('success', 'Product info updated successfully!');
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
    $product = Product::find($id);
    $name = $product->name;
    if ($product->delete()) return redirect()
      ->route('products.index')
      ->with('success', "$name deleted successfully!");
  }
}
