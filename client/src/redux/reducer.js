import { combineReducers } from "redux";
import { searchResultsReducer } from "./searchReducer/slice";
import { mapStateReducer } from "./mapState/slice";
import { mapMarkerReducer } from "./mapMarker/slice";
import { myLocationReducer } from "./location/slice";
import { targetLocationReducer } from "./target/slice";
import { targetMarkerReducer } from "./targetMarker/slice";

const rootReducer = combineReducers({
    searchResults: searchResultsReducer,
    mapState: mapStateReducer,
    mapMarker: mapMarkerReducer,
    location: myLocationReducer,
    target: targetLocationReducer,
    targetMarker: targetMarkerReducer,
});

export default rootReducer;
