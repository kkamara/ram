<?php

namespace App\Http\Controllers;

use App\Http\Requests\CharacterRequest;
use Illuminate\Http\Request;
use App\RamAPI;

class CharacterController extends Controller
{
    /**
     * @var $ramAPI
     */
    protected $ramAPI = null;

    public function __construct() {
        $this->ramAPI = new RamAPI();
    }

    /**
     * Display a listing of characters.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = $this->ramAPI->getChars($request);
        return response()->json(compact('data'));
    }

    /**
     * Display single character
     *
     * @param  string id
     * @return \Illuminate\Http\Response
     */
    public function read($id)
    {
        if (!is_numeric($id)) {
            return response()->json([
               "Message" => "ID parameter must be a valid integer."
            ], 400);
        }
        $data = $this->ramAPI->getCharacter($id);
        if (!$data) {
            return response()->json([
               "Message" => "Oops, something went wrong."
            ], 502);
        }
        return response()->json(compact('data'));
    }

    /**
     * Search through characters api
     *
     * @param  App\Http\Requests\CharacterRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function search(CharacterRequest $request)
    {
        $filters = $this->ramAPI->uriEncodeArray(
            $request->only(['name', 'status', 'species', 'type', 'gender'])
        );
        $data = $this->ramAPI->search($filters, $request);

        return response()->json(compact('data', 'filters'));
    }
}
