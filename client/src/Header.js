import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        console.log("header mounted");
    }, []);
    return (
        <div id="header">
            <p>header</p>
        </div>
    );
}
