<?php

namespace App\Http\Controllers\Settings;

use App\Http\Requests\Settings\MeasurementTypeRequest;
use App\Repositories\Settings\MeasurementTypeRepository;
use App\Settings\MeasurementType;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class MeasurementTypeController extends Controller
{
  private $measurementTypeRepository;
  function __construct(MeasurementTypeRepository $measurementTypeRepository)
  {
    $this->measurementTypeRepository = $measurementTypeRepository;
  }

  /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $measurementTypes = $this->measurementTypeRepository->paginate(10);
      $breadcrumbs = [
        ['link'=>"/",'name'=>"Home"],['link'=>"",'name'=>"Measurement Types"]
      ];
      return Inertia::render('MeasurementType/Index', [
        'breadcrumbs' => $breadcrumbs,
        'measurement_types' => $measurementTypes,
        'has_modal' => true
      ]);
    }

  /**
   * Store a newly created resource in storage.
   *
   * @param MeasurementTypeRequest $request
   * @return \Illuminate\Http\Response
   */
  public function store(MeasurementTypeRequest $request)
  {
    $measurementType = $this->measurementTypeRepository->store();
    if ($measurementType) return redirect()
      ->route('measurement-types.index')
      ->with('success', "$measurementType->name created successfully!");
  }


  /**
   * Update the specified resource in storage.
   *
   * @param MeasurementTypeRequest $request
   * @param $id
   * @return \Illuminate\Http\Response
   */
  public function update(MeasurementTypeRequest $request, $id)
  {
    $measurementType = $this->measurementTypeRepository->update($id);
    if ($measurementType) {
      return redirect()
        ->route('measurement-types.index')
        ->with('success', 'Measurement type info updated successfully!');
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
    $measurementType = MeasurementType::find($id);
    $name = $measurementType->name;
    if ($measurementType->delete()) return redirect()
      ->route('measurement-types.index')
      ->with('success', "$name deleted successfully!");
  }
}
