import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleLocation } from "./redux/location/slice";

export default function Usermenu() {
    const target = useSelector((state) => state.target);
    const showMyLocation = useSelector(
        (state) => state.location && state.location.showMyLocation
    );
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("menu mounted");
    }, []);

    function toggleMyLocation() {
        if (showMyLocation) {
            dispatch(toggleLocation(false));
        } else {
            dispatch(toggleLocation(true));
        }
    }

    return (
        <nav id="side-nav">
            <p>nav</p>
            <span onClick={toggleMyLocation}>my location</span>

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
