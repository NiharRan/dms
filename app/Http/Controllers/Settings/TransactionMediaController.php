<?php

namespace App\Http\Controllers\Settings;

use App\Http\Requests\Settings\TransactionMediaRequest;
use App\Repositories\Settings\TransactionMediaRepository;
use App\Settings\TransactionMedia;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class TransactionMediaController extends Controller
{
  private $transactionMediaRepository;
  function __construct(TransactionMediaRepository $transactionMediaRepository)
  {
    $this->transactionMediaRepository = $transactionMediaRepository;
  }

  /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $transactionMedias = $this->transactionMediaRepository->paginate(10);
      $breadcrumbs = [
        ['link'=>"/",'name'=>"Home"],['link'=>"",'name'=>"Transaction Media"]
      ];
      return Inertia::render('TransactionMedia/Index', [
        'breadcrumbs' => $breadcrumbs,
        'transaction_medias' => $transactionMedias,
        'has_modal' => true
      ]);
    }

  /**
   * Store a newly created resource in storage.
   *
   * @param TransactionMediaRequest $request
   * @return \Illuminate\Http\Response
   */
  public function store(TransactionMediaRequest $request)
  {
    $transactionMedia = $this->transactionMediaRepository->store();
    if ($transactionMedia) return redirect()
      ->route('transaction-media.index')
      ->with('success', "$transactionMedia->name created successfully!");
  }


  /**
   * Update the specified resource in storage.
   *
   * @param TransactionMediaRequest $request
   * @param $id
   * @return \Illuminate\Http\Response
   */
  public function update(TransactionMediaRequest $request, $id)
  {
    $transactionMedia = $this->transactionMediaRepository->update($id);
    if ($transactionMedia) {
      return redirect()
        ->route('transaction-media.index')
        ->with('success', 'Transaction Media info updated successfully!');
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
    $transactionMedia = TransactionMedia::find($id);
    $name = $transactionMedia->name;
    if ($transactionMedia->delete()) return redirect()
      ->route('transaction-media.index')
      ->with('success', "$name deleted successfully!");
  }
}
