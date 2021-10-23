export function searchResultsReducer(state = null, action) {
    if (action.type == "searchResults/receivedSearchResults") {
        state = action.payload.res;
    }
    // else if (action.type == "privateMessages/receivedNewMessage") {
    //     const msg = action.payload.msg;
    //     return [...state, msg];
    // }
    return state;
}

// action creators
export function searchResultsReceived(res) {
    return {
        type: "searchResults/receivedSearchResults",
        payload: { res },
    };
}

export function privateChatMessageReceived(msg) {
    return {
        type: "privateMessages/receivedNewMessage",
        payload: { msg },
    };
}
