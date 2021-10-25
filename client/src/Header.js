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
            <p>header</p>
            <span onClick={handleLogout}> logout</span>
        </div>
    );
}
