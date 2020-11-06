<?php

namespace App\Http\Controllers\Settings;

use App\Http\Requests\Settings\LoadRequest;
use App\Repositories\Settings\LoadRepository;
use App\Settings\Load;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class LoadController extends Controller
{
  private $loadRepository;
  function __construct(LoadRepository $loadRepository)
  {
    $this->loadRepository = $loadRepository;
  }

  /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $loads = $this->loadRepository->paginate(10);
      $breadcrumbs = [
        ['link'=>"/",'name'=>"Home"],['link'=>"",'name'=>"Loads"]
      ];
      return Inertia::render('Load/Index', [
        'breadcrumbs' => $breadcrumbs,
        'loads' => $loads,
        'has_modal' => true
      ]);
    }

  /**
   * Store a newly created resource in storage.
   *
   * @param LoadRequest $request
   * @return \Illuminate\Http\Response
   */
  public function store(LoadRequest $request)
  {
    $load = $this->loadRepository->store();
    if ($load) return redirect()
      ->route('loads.index')
      ->with('success', "$load->amount created successfully!");
  }


  /**
   * Update the specified resource in storage.
   *
   * @param LoadRequest $request
   * @param $id
   * @return \Illuminate\Http\Response
   */
  public function update(LoadRequest $request, $id)
  {
    $load = $this->loadRepository->update($id);
    if ($load) {
      return redirect()
        ->route('loads.index')
        ->with('success', 'Load info updated successfully!');
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
    $load = Load::find($id);
    $amount = $load->amount;
    if ($load->delete()) return redirect()
      ->route('loads.index')
      ->with('success', "$amount deleted successfully!");
  }
}
