import { characterActions } from "./types"

const initialState = {
    data: false
}
const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case characterActions.GET_CHARACTER_PENDING:
            return { ...state, fetched: false, isLoaded: false }
        case characterActions.GET_CHARACTER_ERROR:
            return {
                ...state,
                fetched: false,
                isLoaded: true,
                error: action.payload
            }
        case characterActions.GET_CHARACTER_SUCCESS:
            return {
                ...state,
                fetched: true,
                isLoaded: true,
                data: action.payload
            }
    }

    return state
}
export default characterReducer
