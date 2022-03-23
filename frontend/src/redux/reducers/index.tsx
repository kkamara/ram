import { combineReducers } from "redux"

import searchCharactersReducer from "./searchCharacters"
import charactersReducer from "./characters"
import characterReducer from "./character"

const reducers = combineReducers({
    searchCharacters: searchCharactersReducer,
    characters: charactersReducer,
    character: characterReducer,
})
export default reducers
