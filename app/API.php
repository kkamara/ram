<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class API extends Model
{
    /**
     * API endpoint base url
     * @var $url
     */
    protected $url = '';

    /**
     * HTTP lib for network requests
     * @var $http
     */
    protected $http = '';
    
    /**
     * Base class constructor
     * @param string $url - Optional url to override default assignment
     * @return void
     */
    public function __construct($url = '', $http = null) {
        $this->url  = strlen($url) ? $url : config('app.APIS.RAM_URL');
        $this->http = !is_null($http) ? $http : new Http();
    }
}
