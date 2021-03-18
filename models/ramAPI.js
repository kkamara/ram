const API = require('./api');

class RamAPI extends API {
    /**
     * Call base class construct.
     * @param {string=} url - Optional url to override default assignment
     * @param {any=} http - Optional http to override default assignment
     * @return void
     */
    constructor(url='', http=null) {
        super(url, http);
    }

    /**
     * Return a single character api response
     * @param  {number} id
     * @return string|boolean
     */
    async getCharacter(id) {
        /**
         * @var string $endpoint
         */
        $endpoint = sprintf('%s/character/%s', this.url, id);
        return await this.http.get(endpoint)
            .then(res => res.json())
            .catch(() => false)
    }

    /**
     * Return characters api response     *
     * @param  {number=} page (optional)
     * @return string|boolean
     */
    async getChars(page=null) {
        /** Data page to return @var page[string|int] */
        page = null !== page && null !== page.match(/^\d+$/)
            ? number.parseInt(page)
            : 1;

        /** @var endpoint[string] */
        endpoint = sprintf('%s/character', this.url);
        if (page) endpoint += `/?page=${page}`;

        return await this.http.get(endpoint)
            .then(res => res.json())
            .catch(() => false)
    }

    /**
     * Search through character results.
     * @param  {string} uriEncodedFilters - Store filter values provided in request
     * @param  {number=} page (optional)
     * @return string|boolean
     */
    search(uriEncodedFilters, page) {
        if (!strlen(uriEncodedFilters)) return false;
        /**
         * Data page to return
         * @var string|int $page
         */
        page = null !== page && null !== page.match(/^\d+$/)
            ? number.parseInt(page)
            : 1;

        /**
         * @var string $endpoint
         */
        $endpoint = `${this.url}/character/?page=${page}&${uriEncodedFilters}`;
        return await this.http.get(endpoint)
            .then(res => res.json())
            .catch(() => false)
    }

    /**
     * Get URI encoded string from given array
     * @param  {array} fields - Array containing field values
     * @return string
     */
    uriEncodeArray(fields) {
        /** Default return value @var {string} result */
        result = '';
        /** Maintain iteration count for given array @var {int} count */
        $count = 0;
        for (let name in fields) {
            const value = fields[name];
            if(null === value) continue;
            $result += count === 0
                ? `${name}=${value}`
                : `&${name}=${value}`;
            ++count;
        }

        return result;
    }

    /**
     * Validate search input fields.
     * @param  object - input values for querying R&M characters
     * @return array|false
     */
    validateSearchParams({ name, status, species, type, gender }) {
        result = [];
        
        if (name && 255 <= name.length) {
            result["name"] = "The name exceeds 255 character limit.";
        }

        /** @var {array} statuses */
        const statuses = ['alive', 'dead', 'unknown'];
        if (status) {
            if (255 <= status.length) {
                result["status"] = "The status exceeds 255 character limit.";
            } else if (!status.includes(statuses)) {
                result["status"] = `The status must be one of ${statuses.join(', ')}.`;
            }
        }

        if (species && 255 <= species.length) {
            result["species"] = "The species exceeds 255 character limit.";
        }

        if (type && 255 <= type.length) {
            result["type"] = "The type exceeds 255 character limit.";
        }

        /** @var {array} genderOptions */
        const genderOptions = ['female', 'male', 'genderless', 'unknown'];
        if (gender) {
            if (255 <= gender.length) {
                result["gender"] = "The gender exceeds 255 character limit.";
            } else if (!gender.includes(genderOptions)) {
                result["gender"] = `The gender must be one of ${genderOptions.join(', ')}.`;
            }
        }

        return result.length ? result : false;
    }
}

module.exports = RamAPI;
