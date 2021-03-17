import { APP_URL } from "../../constants";
import { charactersActions } from "../reducers/types";

export default {
    getCharacters
};

function getCharacters(pageNumber = null) {
    return async dispatch => {
        dispatch(request(charactersActions.GET_CHARACTERS_PENDING));
        let url = APP_URL + "/characters";

        if (pageNumber) url += `?page=${pageNumber}`;

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
