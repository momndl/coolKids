import { combineReducers } from "redux";
import { searchResultsReducer } from "./searchReducer/slice";

const rootReducer = combineReducers({
    searchResults: searchResultsReducer,
});

export default rootReducer;
