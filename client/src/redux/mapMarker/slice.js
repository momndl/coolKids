export function mapMarkerReducer(state = null, action) {
    if (action.type == "mapMarker/receivedMarker") {
        console.log("hello", action.payload.data);
        const data = action.payload.data;
        const marker = {
            name: data.text,
            latitude: data.center[1],
            longitude: data.center[0],
        };
        console.log("marker", marker);
        return [...state, marker];
    } else if (action.type == "mapMarker/receivedFavMarker") {
        const data = action.payload.data;
        console.log("hello moses!", data);
        const marker = {
            name: data.name,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
        };
        console.log(marker);
        //  const msg = action.payload.msg;
        return [marker];
    }
    return state;
}

// action creators
export function markerPosReceived(data) {
    return {
        type: "mapMarker/receivedMarker",
        payload: { data },
    };
}

export function favoriteMarkersReceived(data) {
    return {
        type: "mapMarker/receivedFavMarker",
        payload: { data },
    };
}
