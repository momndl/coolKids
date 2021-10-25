//import { BrowserRouter, Route, Link } from "react-router-dom";
import Header from "./Header";
//import Map from "./map";
import React, { useRef, useEffect, useState } from "react";
import Usermenu from "./UserMenu";
import { Test } from "./test";
import Searchbar from "./Searchbar";
import "mapbox-gl/dist/mapbox-gl.css";

export default function App() {
    useEffect(() => {
        "app mounted";
    }, []);
    //
    return (
        <>
            <Header />
            <main>
                <Usermenu />
                {/* <Map /> */}
                <Test />
                <Searchbar />
            </main>
        </>
    );
}
