//import { BrowserRouter, Route, Link } from "react-router-dom";
import Header from "./Header";
import Map from "./map";
import React, { useRef, useEffect, useState } from "react";
import Usermenu from "./UserMenu";

export default function App() {
    useEffect(() => {
        "app mounted";
    }, []);
    //
    return (
        <>
            <Header />
            <Usermenu />
            <Map />
        </>
    );
}
