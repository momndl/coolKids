export function mapStateReducer(state = null, action) {
    if (action.type == "mapState/receivedMapState") {
        console.log(action.payload.map);
        state = action.payload.map;
    } else if (action.type == "mapState/receivedNewMapState") {
        const map = action.payload.map;
        return map;
    } else if (action.type == "mapState/receivedNewCoordinates") {
        const newPos = action.payload.pos;
        console.log("coords:", action.payload.pos);
        console.log("state:", state);
        return {
            ...state,
            latitude: newPos[1],
            longitude: newPos[0],
            zoom: 16,
        };
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

export function updateMapCoordinates(pos) {
    return {
        type: "mapState/receivedNewCoordinates",
        payload: { pos },
    };
}
