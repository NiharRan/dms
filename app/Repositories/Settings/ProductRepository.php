<?php


namespace App\Repositories\Settings;

use App\Settings\Product;
use App\Traits\RepositoryTrait;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class ProductRepository
{
    use RepositoryTrait;
    private $product;
    protected $guarded = [];

    public function __construct(Product $product)
    {
      $this->product = $product;
    }

    public function all()
    {
      $rows = $this->product->with('product_type')->orderBy('name');
      if (\request()->has('query') && \request()->query != '') {
        $search = \request()->search;
        $rows = $rows->where('name', 'like', "%$search")
            ->orWhereHas('product_type', function ($q) use ($search) {
              $q->where('name', 'like', "%$search");
            });
      }
      if (request()->has('status')) {
        $rows = $rows->where('status', request()->status);
      }

      return $rows;
    }


    public function findById($rowId)
    {
      return $this->product->find($rowId);
    }

    public function update(Request $request, $rowId)
    {
      $row = $this->product->find($rowId);
      $row = $this->setupData($request, $row);
      $row->status = filter_var($request->status, FILTER_VALIDATE_BOOLEAN);

      if ($row->save()) {
        return $row;
      }
      return  null;
    }

    public function setupData(Request $request, Product $product)
    {
      $product->name = $request->name;
      $product->slug = make_slug($request->name);
      $product->product_type_id = $request->product_type_id;

      return $product;
    }

    public function destroy($rowId)
    {
      return $this->product->find($rowId)->delete();
    }

    public function store(Request $request)
    {
      $row = new $this->product;
      $row = $this->setupData($request, $row);

      if ($row->save()) {
        return $row;
      }
      return null;
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

    public function uploadImage(string $fileNameToStore, $request)
    {
      $request->file('image')->storeAs('public/products', $fileNameToStore);
      $request->file('image')->storeAs('public/products/thumbnail/small', $fileNameToStore);
      $request->file('image')->storeAs('public/products/thumbnail/medium', $fileNameToStore);

      //create small thumbnail
      $smallThumbnailPath = public_path('storage/products/thumbnail/small/'.$fileNameToStore);
      $this->createThumbnail($smallThumbnailPath, 150, 93);

      //create medium thumbnail
      $mediumThumbnailPath = public_path('storage/products/thumbnail/medium/'.$fileNameToStore);
      $this->createThumbnail($mediumThumbnailPath, 300, 185);
    }


}
