export function mapStateReducer(state = null, action) {
    if (action.type == "mapState/receivedMapState") {
        console.log(action.payload.map);
        state = action.payload.map;
    } else if (action.type == "mapState/receivedNewMapState") {
        const map = action.payload.map;
        return map;
    }
    return state;
}

// action creators
export function mapStateReceived(map) {
    return {
        type: "mapState/receivedMapState",
        payload: { map },
    };
}

export function updateMapState(map) {
    return {
        type: "mapState/receivedNewMapState",
        payload: { map },
    };
}
