const { helpersConfig } = require("../config");
const axios = require('axios');

class API {
    /** API endpoint base url @var url */
    url = '';

    /** HTTP lib for network requests @var http */
    http = '';

    /**
     * Base class constructor
     * @param string $url - Optional url to override default assignment
     * @return void
     */
    constructor(url='', http=null) {
        this.url  = url.length ? url : helpersConfig.ramURL;
        this.http = null !== http ? http : axios;
    }
}

module.exports = API;