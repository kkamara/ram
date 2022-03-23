import { searchCharactersActions } from "./types"

const initialState = {
    data: false
}
const searchCharactersReducer = (state = initialState, action) => {
    switch (action.type) {
        case searchCharactersActions.SEARCH_CHARACTERS_PENDING:
            return { ...state, fetched: false, isLoaded: false }
        case searchCharactersActions.SEARCH_CHARACTERS_ERROR:
            return {
                ...state,
                fetched: false,
                isLoaded: true,
                error: action.payload
            }
        case searchCharactersActions.SEARCH_CHARACTERS_SUCCESS:
            return {
                ...state,
                fetched: true,
                isLoaded: true,
                data: action.payload
            }
    }

    return state
}

export default searchCharactersReducer
