import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
    useEffect(() => {
        console.log("header mounted");
    }, []);
    const handleLogout = () => {
        fetch("/logout")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    location.replace("/");
                }
            });
    };
    const myLocation = useSelector(
        (state) => state.location && state.location.data
    );
    return (
        <div id="header">
            <div className="headerLogoDiv">
                <img
                    onClick={() => {
                        location.reload();
                    }}
                    className="headerLogo"
                    src="slide.png"
                />
                <h1>Cool Kids</h1>
                {!myLocation ? (
                    <div className="locationStatus red"> </div>
                ) : (
                    <div className="locationStatus green"> </div>
                )}
            </div>

            <span onClick={handleLogout}> logout</span>
        </div>
    );
}
