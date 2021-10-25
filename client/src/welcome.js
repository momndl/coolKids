// import { Registration } from "./registration.js";
// import { Component } from "react";
// import Logo from "./logo.js";
// import { Login } from "./login.js";
import Login from "./login";
import Registration from "./registration";
import { BrowserRouter, Route } from "react-router-dom";
//import { Reset } from "./resetpassword";

export default function Welcome() {
    return (
        <BrowserRouter>
            <section id="welcome">
                <Route exact path="/">
                    <Registration />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                {/* <Route path="/passwordreset">
                    <Reset />
                </Route> */}
            </section>
        </BrowserRouter>
    );
}
