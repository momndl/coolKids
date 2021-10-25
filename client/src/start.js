//import React from "react";
import ReactDOM from "react-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import App from "./App";
import Welcome from "./welcome";
//import Header from "./Header";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer.js";
import * as immutableState from "redux-immutable-state-invariant";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

const elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

// ;
ReactDOM.render(<Welcome />, document.getElementById("root"));

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        console.log("data after start fetch", data);
        if (!data.userId) {
            // this means our user is not registered/logged in, we should see Welcome component
            ReactDOM.render(<Welcome />, document.querySelector("root"));
        } else {
            // this means our user IS registered/logged in!
            ReactDOM.render(elem, document.getElementById("root"));
        }
    });
