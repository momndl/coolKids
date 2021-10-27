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
        return [...state];
    } else if (action.type == "mapMarker/receivedFavMarker") {
        const data = action.payload.data;
        console.log("hello moses!", data);
        console.log("length", data.length);
        const markers = [];
        for (let i = 0; i < data.length; i++) {
            console.log("mhhhh", data[i]);
            markers.push(data[i]);
        }

        console.log("markers:", markers);
        //  const msg = action.payload.msg;
        return [{ favorites: markers }];
    } else if (action.type == "mapMarker/removeFavMarker") {
        const toRemove = action.payload.data;

        const spreadState = [...state];

        console.log("WWTTFF", spreadState[0].favorites);
        console.log("WTF!", spreadState);
        const newFavs = state[0].favorites.filter(
            (fav) => fav.mapbox_id != toRemove.id
        );

        return [{ favorites: newFavs }];
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

export function removeFavoriteMarker(data) {
    return {
        type: "mapMarker/removeFavMarker",
        payload: { data },
    };
}
