import { charactersActions } from "./types";

const initialState = {
    data: false
};
const charactersReducer = (state = initialState, action) => {
    switch (action.type) {
        case charactersActions.SEARCH_CHARACTERS_PENDING:
        case charactersActions.GET_CHARACTERS_PENDING:
            return { ...state, fetched: false, isLoaded: false };
        case charactersActions.SEARCH_CHARACTERS_ERROR:
        case charactersActions.GET_CHARACTERS_ERROR:
            return {
                ...state,
                fetched: false,
                isLoaded: true,
                error: action.payload
            };
        case charactersActions.SEARCH_CHARACTERS_SUCCESS:
        case charactersActions.GET_CHARACTERS_SUCCESS:
            return {
                ...state,
                fetched: true,
                isLoaded: true,
                data: action.payload
            };
    }

    return state;
};

export default charactersReducer;
