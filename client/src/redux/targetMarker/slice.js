export function targetMarkerReducer(state = null, action) {
    if (action.type == "targetMarker/receivedMarker") {
        const targetMarker = action.payload.data;

        return [targetMarker];
    } else {
        return state;
    }
}

// action creators
export function targetMarkerReceived(data) {
    return {
        type: "targetMarker/receivedMarker",
        payload: { data },
    };
}
