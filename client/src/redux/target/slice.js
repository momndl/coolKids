export function targetLocationReducer(state = null, action) {
    if (action.type == "target/receivedTargetData") {
        const data = action.payload.data;
        if (Array.isArray(data)) {
            return { data: data[0] };
        } else if (data === null) {
            return null;
        }
        return { data };
    }
    // else if (action.type == "privateMessages/receivedNewMessage") {
    //     const msg = action.payload.msg;
    //     return [...state, msg];
    // }
    return state;
}

// action creators
export function targetDataReceived(data) {
    return {
        type: "target/receivedTargetData",
        payload: { data },
    };
}

// === dispatch from map is an array, we need object
