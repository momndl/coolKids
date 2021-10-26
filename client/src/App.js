//import { BrowserRouter, Route, Link } from "react-router-dom";
import Header from "./Header";
//import Map from "./map";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Usermenu from "./UserMenu";
import { Map } from "./Map";
import { favoriteMarkersReceived } from "./redux/mapMarker/slice";

import "mapbox-gl/dist/mapbox-gl.css";

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch("/user/getFavorites.json").then((resp) =>
            resp
                .json()
                .then((resp) => {
                    console.log("RES GET /user/getFavorites", resp);
                    dispatch(favoriteMarkersReceived(resp));
                })
                .catch((err) => {
                    console.log("err in POST /registration.json", err);
                    // setError({
                    //     error: "Something went wrong with registration",
                    // });
                })
        );
    }, []);
    //
    return (
        <>
            <Header />
            <main id="appMainContainer">
                <Usermenu />
                {/* <Map /> */}
                <Map />
            </main>
        </>
    );
}
