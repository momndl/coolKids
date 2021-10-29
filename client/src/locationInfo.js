import { useSelector } from "react-redux";

export default function LocationMarker() {
    const location = useSelector((state) => state.location);

    if (location.data) {
        const { pos, accuracy } = location.data;

        const roundAccuracy = Math.floor(accuracy);

        return (
            <div className="locationinfobar">
                {" "}
                ({pos[1]}, {pos[0]}) accuracy: {roundAccuracy} meters
            </div>
        );
    } else {
        return <div className="locationinfobar">loading location data</div>;
    }
}
