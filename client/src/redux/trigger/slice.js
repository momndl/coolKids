export function triggerReducer(state = null, action) {
    if (action.type == "trigger/receivedTrigger") {
        console.log("hello", action.payload.trigger);
        const data = action.payload.trigger;
        if (state === null) {
            return [data];
        } else {
            return [...state, data];
        }
    }

    // else if (action.type == "privateMessages/receivedNewMessage") {
    //     const msg = action.payload.msg;
    //     return [...state, msg];
    // }
    return state;
}

// action creators
export function triggerReceived(trigger) {
    return {
        type: "trigger/receivedTrigger",
        payload: { trigger },
    };
}
