export function myLocationReducer(state = null, action) {
    if (action.type == "location/initLocationReceived") {
        const data = action.payload.pos;
        if (state) {
            return { ...state, data };
        } else {
            return { data };
        }
    } else if (action.type == "location/enableDisableTracking") {
        const bool = action.payload.bool;
        const toggle = { showMyLocation: bool };
        // for start no state

        if (state) {
            return { ...state, showMyLocation: bool };
        } else {
            return toggle;
        }
    }
    return state;
}

// action creators
export function locationInitPosReceived(pos) {
    return {
        type: "location/initLocationReceived",
        payload: { pos },
    };
}
export function toggleLocation(bool) {
    return {
        type: "location/enableDisableTracking",
        payload: { bool },
    };
}
