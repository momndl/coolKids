import { useEffect } from "react";

export default function Usermenu() {
    useEffect(() => {
        console.log("menu mounted");
    }, []);
    return (
        <nav id="side-nav">
            <p>nav</p>
        </nav>
    );
}
