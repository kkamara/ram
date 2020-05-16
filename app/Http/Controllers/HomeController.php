<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RamAPI;

class HomeController extends Controller
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
        $title = "Home";
        $data = $this->ramAPI->getChars($request);
        return view('home.index', compact('title', 'data'));
    }

    /**
     * Display single character
     *
     * @param  int id
     * @return \Illuminate\Http\Response
     */
    public function read(int $id)
    {
        $data = $this->ramAPI->getCharacter($id);
        if (!$data) return abort(404, "Oops, something went wrong.");
        $title = sprintf('%s | Characters', $data['name']);
        return view('home.read', compact('title', 'data'));
    }

    /**
     * Search through characters api
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $title = 'Search | Form';

        $input = $request->only(['name', 'status', 'species', 'type', 'gender']);

        $inputErrors = $this->ramAPI->validateSearchParams($request);
        if (false !== $inputErrors) {
            return view('home.search', [
                'title' => $title,
                'errors' => $inputErrors,
                'input' => $input,
                'data' => [],
                'filters' => '',
            ]);
        }

        $sanitizedInput = $this->ramAPI->getSearchParams($request);
        $filters = $this->ramAPI->uriEncodeArray($sanitizedInput);
        $data = $this->ramAPI->search($filters, $request);

        return view('home.search', compact('title', 'data', 'input', 'filters'));
    }
}
