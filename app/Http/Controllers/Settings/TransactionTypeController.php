<?php

namespace App\Http\Controllers\Settings;

use App\Http\Requests\Settings\TransactionTypeRequest;
use App\Repositories\Settings\TransactionTypeRepository;
use App\Settings\TransactionType;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class TransactionTypeController extends Controller
{
  private $transactionTypeRepository;
  function __construct(TransactionTypeRepository $transactionTypeRepository)
  {
    $this->transactionTypeRepository = $transactionTypeRepository;
  }

  /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $transactionTypes = $this->transactionTypeRepository->paginate(10);
      $breadcrumbs = [
        ['link'=>"/",'name'=>"Home"],['link'=>"",'name'=>"Transaction Types"]
      ];
      return Inertia::render('TransactionType/Index', [
        'breadcrumbs' => $breadcrumbs,
        'transaction_types' => $transactionTypes,
        'has_modal' => true
      ]);
    }

  /**
   * Store a newly created resource in storage.
   *
   * @param TransactionTypeRequest $request
   * @return \Illuminate\Http\Response
   */
  public function store(TransactionTypeRequest $request)
  {
    $transactionType = $this->transactionTypeRepository->store();
    if ($transactionType) return redirect()
      ->route('transaction-types.index')
      ->with('success', "$transactionType->name created successfully!");
  }


  /**
   * Update the specified resource in storage.
   *
   * @param TransactionTypeRequest $request
   * @param $id
   * @return \Illuminate\Http\Response
   */
  public function update(TransactionTypeRequest $request, $id)
  {
    $transactionType = $this->transactionTypeRepository->update($id);
    if ($transactionType) {
      return redirect()
        ->route('transaction-types.index')
        ->with('success', 'Transaction type info updated successfully!');
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
    $transactionType = TransactionType::find($id);
    $name = $transactionType->name;
    if ($transactionType->delete()) return redirect()
      ->route('transaction-types.index')
      ->with('success', "$name deleted successfully!");
  }
}
