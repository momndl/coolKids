import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Searchbar from "./Searchbar";

export default function Usermenu() {
    const target = useSelector((state) => state.target);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log("menu mounted");
    }, []);

    useEffect(() => {
        console.log("menu mounted", target);
    }, [target]);

    return (
        <nav id="side-nav">
            <Searchbar />

            {target && (
                <div className="searchTarget">
                    <p>{target.data.text}</p>
                    <p>
                        {target.data.properties.address},{" "}
                        {target.data.context[0].text}
                    </p>
                </div>
            )}
        </nav>
    );
}
