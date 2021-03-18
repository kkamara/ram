import { APP_URL } from "../../constants";
import { characterActions } from "../reducers/types";

export default {
    getCharacter
};

function getCharacter(id) {
    return async dispatch => {
        dispatch(request(characterActions.GET_CHARACTER_PENDING));
        let url = APP_URL + `/characters/${id}`;

        url = encodeURI(url);
        await fetch(url)
            .then(res => res.json())
            .then(json => {
                const payload = json.data ? json.data : false;
                dispatch(success(characterActions.GET_CHARACTER_SUCCESS, payload));
            })
            .catch(err => {
                dispatch(error(characterActions.GET_CHARACTER_ERROR, err));
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
