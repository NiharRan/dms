<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Repositories\TransactionRepository;
use App\Settings\TransactionMedia;
use App\Settings\TransactionType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    protected $transactionRepository;
    public function __construct(TransactionRepository $transactionRepository)
    {
      $this->transactionRepository = $transactionRepository;
    }
  
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function statement()
    {
      $pageConfigs = [
        'pageHeader' => true
      ];
      $breadcrumbs = [
        ['link' => "/", 'name' => __('Home')],
        ['name' => __("Account Statement")],
      ];
      $transaction_types = TransactionType::orderBy('name', 'asc')->get();
      $medias = TransactionMedia::orderBy('name', 'asc')->get();
      $transactions = TransactionResource::collection($this->transactionRepository->paginate(20));
      return Inertia::render('Account/Statement', [
        'breadcrumbs' => $breadcrumbs,
        'transactions' => $transactions,
        'transaction_types' => $transaction_types,
        'medias' => $medias,
        'has_modal' => false,
      ]);
    }


     /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function ledger($id)
    {
      $pageConfigs = [
        'pageHeader' => true
      ];
      $breadcrumbs = [
        ['link' => "/", 'name' => __('Home')],
        ['name' => __("Account Ledger")],
      ];
      $transaction = $this->transactionRepository->findById($id);
      return Inertia::render('Account/Ledger', [
        'breadcrumbs' => $breadcrumbs,
        'transaction' => $transaction,
        'has_modal' => false,
      ]);
    }
}
