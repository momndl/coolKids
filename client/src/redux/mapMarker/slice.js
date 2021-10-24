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
        state = [marker];
    }
    // else if (action.type == "privateMessages/receivedNewMessage") {
    //     const msg = action.payload.msg;
    //     return [...state, msg];
    // }
    return state;
}

// action creators
export function markerPosReceived(data) {
    return {
        type: "mapMarker/receivedMarker",
        payload: { data },
    };
}

// export function privateChatMessageReceived(msg) {
//     return {
//         type: "privateMessages/receivedNewMessage",
//         payload: { msg },
//     };
// }
