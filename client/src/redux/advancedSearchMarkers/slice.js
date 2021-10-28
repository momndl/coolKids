export function advancedSearchMarkerReducer(state = null, action) {
    if (action.type == "advancedMarker/receivedMarker") {
        const advancedMarker = action.payload.data;
        console.log("okay check it:", advancedMarker);
        if (advancedMarker === null) {
            return null;
        }
        return advancedMarker;
    } else {
        return state;
    }
}

// action creators
export function advancedMarkerReceived(data) {
    return {
        type: "advancedMarker/receivedMarker",
        payload: { data },
    };
}
