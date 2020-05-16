<?php

namespace App;

use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Validator;

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
     * Return a single character api response
     *
     * @param  int $id
     * @return string|boolean
     */
    public function getCharacter(int $id) {
        /**
         * @var string $endpoint
         */
        $endpoint = sprintf('%s/character/%s', $this->url, $id);
        $r = $this->http::get($endpoint);
        return $r->ok() ? $r->json() : false;
    }

    /**
     * Return characters api response
     *
     * @param  \Illuminate\Http\Request $request
     * @return string|boolean
     */
    public function getChars(Request $request) {
        /**
         * Data page to return
         * @var string|int $page
         */
        $page = !is_null($request->page) && is_numeric($request->page)
            ? (int) $request->page
            : 1;
        /**
         * @var string $endpoint
         */
        $endpoint = sprintf('%s/character', $this->url);
        if ($page) $endpoint .= sprintf("/?page=%s", $page);
        $r = $this->http::get($endpoint);
        return $r->ok() ? $r->json() : false;
    }

    /**
     * Search through character results.
     *
     * @param  string $uriEncodedFilters - Store filter values provided in request
     * @param  \Illuminate\Http\Request $request
     * @return string|boolean
     */
    public function search(string $uriEncodedFilters, Request $request) {
        if (!strlen($uriEncodedFilters)) return false;
        /**
         * Data page to return
         * @var string|int $page
         */
        $page = !is_null($request->page) && is_numeric($request->page)
            ? (int) $request->page
            : 1;
        /**
         * @var string $endpoint
         */
        $endpoint = sprintf('%s/character/?page=%s&%s', $this->url, $page, $uriEncodedFilters);
        $r = $this->http::get($endpoint);
        return $r->ok() ? $r->json() : false;
    }

    /**
     * Get URI encoded string from given array
     *
     * @param  array $a - Array containing field values
     * @return string
     */
    public function uriEncodeArray(array $a) {
        /**
         * Return this value at end of function call
         * @var string $result
         */
        $result = '';
        /**
         * Maintain iteration count for given array
         * @var int $count
         */
        $count = 0;
        foreach($a as $name => $value) {
            if(is_null($value)) continue;
            $result .= $count === 0
                ? sprintf('%s=%s', $name, $value)
                : sprintf('&%s=%s', $name, $value);
            ++$count;
        }

        return $result;
    }

    /**
     * Get sanitized search form fields.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function getSearchParams(Request $request) {
        $input = $request->only(['name', 'status', 'species', 'type', 'gender']);

        if (isset($input['name']) && strlen($input['name'])) {
            $input['name'] = filter_var($input['name'], FILTER_SANITIZE_STRING);
        }

        if (isset($input['status']) && strlen($input['status'])) {
            $input['status'] = filter_var($input['status'], FILTER_SANITIZE_STRING);
        }

        if (isset($input['species']) && strlen($input['species'])) {
            $input['species'] = filter_var($input['species'], FILTER_SANITIZE_STRING);
        }

        if (isset($input['type']) && strlen($input['type'])) {
            $input['type'] = filter_var($input['type'], FILTER_SANITIZE_STRING);
        }

        if (isset($input['gender']) && strlen($input['gender'])) {
            $input['gender'] = filter_var($input['gender'], FILTER_SANITIZE_STRING);
        }

        return $input;
    }

    /**
     * Validate search input fields.
     *
     * @param  \illuminate\Http\Request $request
     * @return Validator|boolean
     */
    public function validateSearchParams(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'max:255',
            'status' => [
                Rule::in(['', 'alive', 'dead', 'unknown']),
                'max:255'
            ],
            'species' => 'max:255',
            'type' => 'max:255',
            'gender' => [
                Rule::in(['', 'female', 'male', 'genderless', 'unknown']),
                'max:255',
            ],
        ]);

        return $validator->fails() ? $validator : false;
    }
}
