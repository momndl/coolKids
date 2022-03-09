import { useSelector } from "react-redux";

export default function LocationMarker() {
    const location = useSelector((state) => state.location);
    const { pos, accuracy } = location.data;

    const roundAccuracy = Math.floor(accuracy);

    return (
        <div>
            {location.data ? (
                <div className="locationinfobar">
                    {" "}
                    ({pos[1]}, {pos[0]}) accuracy: {roundAccuracy} meters
                </div>
            ) : (
                <div className="locationinfobar">loading location data</div>
            )}{" "}
        </div>
    );
}
