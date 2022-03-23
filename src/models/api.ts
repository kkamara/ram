import helpersConfig from "../config"
import axios from 'axios'

class API {
    /** API endpoint base url @prop url */
    _url = ''

    /** HTTP lib for network requests @prop http */
    _http = ''

    /**
     * Base class constructor
     * @param {string=} url - Optional url to override default assignment
     * @param {any=} http - Optional http to override default assignment
     * @return void
     */
    constructor(url=null, http=null) {
        this._url  = null !== url ? url : helpersConfig.ramAPI
        this._http = null !== http ? http : axios
    }
}

export default API
