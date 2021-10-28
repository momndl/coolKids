export function mapMarkerReducer(state = null, action) {
    if (action.type == "mapMarker/receivedMarker") {
        const targetMarker = action.payload.data;
        const spreadstate = [...state];

        if (spreadstate[1]) {
            spreadstate.pop();
            spreadstate.push(targetMarker);

            //return [spreadstate];
        }
        //return [...state, { target: targetMarker }];
        // this might not be needed anymore, check if theres time
    } else if (action.type == "mapMarker/receivedFavMarker") {
        const data = action.payload.data;
        const markers = [];
        for (let i = 0; i < data.length; i++) {
            markers.push(data[i]);
        }

        //  const msg = action.payload.msg;
        return [{ favorites: markers }];
    } else if (action.type == "mapMarker/removeFavMarker") {
        const toRemove = action.payload.data;
        const newFavs = state[0].favorites.filter(
            (fav) => fav.mapbox_id != toRemove.id
        );
        return [{ favorites: newFavs }];
    } else if (action.type == "mapMarker/addNewFavMarker") {
        console.log("state", state);
        const newState = [...state[0].favorites];
        console.log("dingsi", action.payload.data);
        const data = action.payload.data;
        const newMarker = {
            name: data.place_name,
            mapbox_id: data.id,
            longitude: data.center[0],
            latitude: data.center[1],
        };
        newState.push(newMarker);

        return [{ favorites: newState }];
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

export function addFavoriteMarker(data) {
    return {
        type: "mapMarker/addNewFavMarker",
        payload: { data },
    };
}
