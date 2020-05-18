<?php

namespace App\Http\Controllers;

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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $inputErrors = $this->ramAPI->validateSearchParams($request);
        if (false !== $inputErrors) {
            return response()->json([
                'errors' => $inputErrors->errors()->all(),
            ], 422);
        }

        $sanitizedInput = $this->ramAPI->getSearchParams($request);
        $filters = $this->ramAPI->uriEncodeArray($sanitizedInput);
        $data = $this->ramAPI->search($filters, $request);

        return response()->json(compact('data', 'filters'));
    }
}
