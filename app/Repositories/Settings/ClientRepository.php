<?php


namespace App\Repositories\Settings;

use App\Settings\Client;
use App\Traits\RepositoryTrait;
use Illuminate\Http\Request;

class ClientRepository
{
    use RepositoryTrait;
    private $client;
    protected $guarded = [];

    public function __construct(Client $client)
    {
      $this->client = $client;
    }

    public function all()
    {
      $rows = $this->client->orderBy('name');
      if (\request()->has('query') && \request()->query != '') {
        $search = \request()->search;
        $rows = $rows->where('name', 'like', "%$search")
          ->orWhere('phone', 'like', "%$search")
        ->orWhere('address', 'like', "%$search");
      }
      if (request()->has('status')) {
        $rows = $rows->where('status', request()->status);
      }

      return $rows;
    }


    public function findById($rowId)
    {
      return $this->client->find($rowId);
    }

    public function update(Request $request, $rowId)
    {
      $row = $this->client->find($rowId);
      $row = $this->setupData($request, $row);
      $row->status = filter_var($request->status, FILTER_VALIDATE_BOOLEAN);

      if ($row->save()) {
        return $row;
      }
      return  null;
    }

    public function setupData(Request $request, Client $client)
    {
      $client->name = $request->name;
      $client->slug = make_slug($request->name);
      $client->phone = $request->phone;
      $client->address = $request->address;

      return $client;
    }

    public function destroy($rowId)
    {
      return $this->client->find($rowId)->delete();
    }

    public function store(Request $request)
    {
      $row = new $this->client;
      $row = $this->setupData($request, $row);

      if ($row->save()) {
        return $row;
      }
      return null;
    }
}
