export function searchResultsReducer(state = null, action) {
    if (action.type == "searchResults/receivedSearchResults") {
        const search = action.payload.res;
        return search;
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

// export function removeSearchResult(msg) {
//     return {
//         type: "privateMessages/receivedNewMessage",
//         payload: { msg },
//     };
// }
