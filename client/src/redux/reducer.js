import { combineReducers } from "redux";
import { searchResultsReducer } from "./searchReducer/slice";
import { mapStateReducer } from "./mapState/slice";

const rootReducer = combineReducers({
    searchResults: searchResultsReducer,
    mapState: mapStateReducer,
});

export default rootReducer;
