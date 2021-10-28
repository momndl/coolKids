import { useEffect } from "react";

export default function App() {
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
    return (
        <div id="header">
            <div className="headerLogoDiv">
                <img className="headerLogo" src="slide.png" />
                <h1>Cool Kids</h1>
            </div>
            <span onClick={handleLogout}> logout</span>
        </div>
    );
}
