import { combineReducers } from "redux";
import { searchResultsReducer } from "./searchReducer/slice";
import { mapStateReducer } from "./mapState/slice";
import { mapMarkerReducer } from "./mapMarker/slice";

const rootReducer = combineReducers({
    searchResults: searchResultsReducer,
    mapState: mapStateReducer,
    mapMarker: mapMarkerReducer,
});

export default rootReducer;
