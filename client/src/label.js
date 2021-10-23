import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function CustomMarker() {
    const mapState = useSelector((state) => state.mapState);
    const { longitude, latitude, zoom } = mapState;
    useEffect(() => {
        console.log("infolabel mounted");
    }, []);

    return (
        <div className="mapinfobar">
            ({longitude}, {latitude}, Zoom: {zoom})
        </div>
    );
}
