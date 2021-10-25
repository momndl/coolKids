export function targetLocationReducer(state = null, action) {
    if (action.type == "target/receivedTargetData") {
        console.log("hello", action.payload.data);
        const data = action.payload.data;
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

// export function privateChatMessageReceived(msg) {
//     return {
//         type: "privateMessages/receivedNewMessage",
//         payload: { msg },
//     };
// }
