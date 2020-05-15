<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\API;

class RamAPI extends API
{
    /**
     * Call base class construct.
     * @param string $url - Optional url to override default assignment
     * @return void
     */
    public function __construct($url = '', $http = null) {
        parent::__construct($url, $http);
    }

    /**
     * Return characters api response
     *
     * @param  \Illuminate\Http\Request $request
     * @return JSON|boolean
     */
    public function getChars(Request $request) {
        /**
         * Data page to return
         * @var string|int $page
         */
        $page = !is_null($request->page) && is_numeric($request->page)
            ? (int) $request->page
            : 0;
        /**
         * @var string $endpoint
         */
        $endpoint = sprintf('%s/character', $this->url);
        if ($page) $endpoint .= sprintf("/?page=%s", $page);
        $r = $this->http::get($endpoint);
        return $r->ok() ? $r->json() : false;
    }
}
