import { APP_URL } from "../../constants";
import { charactersActions } from "../reducers/types";
import { convertArrayToGETParams } from "../../utilities/methods";

export default {
    searchCharacters,
    getCharacters
};

function searchCharacters(pageNumber = null, params = {}) {
    return async dispatch => {
        dispatch(request(charactersActions.SEARCH_CHARACTERS_PENDING));
        let url = APP_URL + "/characters";

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
                dispatch(
                    success(
                        charactersActions.SEARCH_CHARACTERS_SUCCESS,
                        {
                            filters: json.filters,
                            ...json.data,
                        }
                    )
                );
            })
            .catch(err => {
                dispatch(error(charactersActions.SEARCH_CHARACTERS_ERROR, err));
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

function getCharacters(pageNumber = null, params = {}) {
    return async dispatch => {
        dispatch(request(charactersActions.GET_CHARACTERS_PENDING));
        let url = APP_URL + "/characters";

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
                dispatch(
                    success(charactersActions.GET_CHARACTERS_SUCCESS, json.data)
                );
            })
            .catch(err => {
                dispatch(error(charactersActions.GET_CHARACTERS_ERROR, err));
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
