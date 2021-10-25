import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function CustomMarker() {
    const mapState = useSelector((state) => state.mapState);
    const { longitude, latitude, zoom } = mapState;
    const zoomRound = zoom.toFixed(1);
    const longFixed = longitude.toFixed(5);
    const latFixed = latitude.toFixed(5);
    useEffect(() => {
        console.log("infolabel mounted");
    }, []);

    return (
        <div className="mapinfobar">
            ({longFixed}, {latFixed}) Zoom: {zoomRound}
        </div>
    );
}
