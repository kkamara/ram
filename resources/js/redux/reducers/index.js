import { combineReducers } from "redux";

import charactersReducer from "./characters";
import characterReducer from "./character";

const reducers = combineReducers({
    characters: charactersReducer,
    character: characterReducer,
});
export default reducers;
