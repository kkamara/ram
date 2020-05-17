import { APP_URL } from "../../constants";
import { searchCharactersActions } from "../reducers/types";
import { convertArrayToGETParams } from "../../utilities/methods";

export default {
    searchCharacters
};

function searchCharacters(pageNumber = null, params = {}) {
    return async dispatch => {
        console.log("params",params);
        dispatch(request(searchCharactersActions.SEARCH_CHARACTERS_PENDING));
        let url = APP_URL + "/characters/search";

        let GETVars = convertArrayToGETParams(params);

        if (pageNumber) {
            url += `?page=${pageNumber}`;

            if (GETVars.length > 0) {
                url += `&${GETVars}`;
            }
        } else {
            if (GETVars.length > 0) {
                url += `?${GETVars}`;
            }
        }
        url = encodeURI(url);
        await fetch(url)
            .then(res => res.json())
            .then(json => {
                const payload = json.errors ?
                    { errors: json.errors } :
                    {
                        filters: json.filters,
                        ...json.data,
                    };
                dispatch(success(searchCharactersActions.SEARCH_CHARACTERS_SUCCESS, payload));
            })
            .catch(err => {
                dispatch(error(searchCharactersActions.SEARCH_CHARACTERS_ERROR, err));
            });

        function request(type) {
            return {
                type
            };
        }

        function error(type, payload) {
            return {
                type,
                payload
            };
        }

        function success(type, payload) {
            return {
                type,
                payload
            };
        }
    };
}