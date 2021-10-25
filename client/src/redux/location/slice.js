export function myLocationReducer(state = null, action) {
    if (action.type == "location/initLocationReceived") {
        console.log("hello", action.payload.pos);
        const data = action.payload.pos;
        // const marker = {
        //     name: data.text,
        //     latitude: data.center[1],
        //     longitude: data.center[0],
        // };
        // console.log("marker", marker);
        // state = [marker];
    } else if (action.type == "location/enableDisableTracking") {
        console.log("bool:", action.type.bool);
        const bool = action.payload.bool;
        const toggle = { showMyLocation: bool };
        // for start no state
        return toggle;
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
