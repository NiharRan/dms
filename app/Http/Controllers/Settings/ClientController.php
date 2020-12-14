<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ClientRequest;
use App\Repositories\Settings\ClientRepository;
use App\Settings\Client;
use App\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
  private $clientRepository;
  function __construct(ClientRepository $clientRepository)
  {
    $this->clientRepository = $clientRepository;
  }

  /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $clients = $this->clientRepository->paginate(request()->per_page);
      $breadcrumbs = [
        ['link'=>"/",'name'=>"Home"],['link'=>"",'name'=>"Clients"]
      ];
      $user = User::find(Auth::id());
      $page = $user->is_admin ? 'Index' : 'List';
      return Inertia::render("Client/$page", [
        'breadcrumbs' => $breadcrumbs,
        'clients' => $clients,
        'has_modal' => true
      ]);
    }

  /**
   * Store a newly created resource in storage.
   *
   * @param ClientRequest $request
   * @return \Illuminate\Http\Response
   */
  public function store(ClientRequest $request)
  {
    $client = $this->clientRepository->store($request);

    if ($client) return redirect()
      ->route('clients.index')
      ->with('success', "$client->name created successfully!");
  }


  /**
   * Update the specified resource in storage.
   *
   * @param ClientRequest $request
   * @param $id
   * @return \Illuminate\Http\Response
   */
  public function update(ClientRequest $request, $id)
  {
    $client = $this->clientRepository->update($request, $id);

    if ($client) {
      return redirect()
        ->route('clients.index')
        ->with('success', 'Client info updated successfully!');
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
    $client = Client::find($id);
    $name = $client->name;
    if ($client->delete()) return redirect()
      ->route('clients.index')
      ->with('success', "$name deleted successfully!");
  }
}
