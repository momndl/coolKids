import ReactMapGL, { Marker, GeolocateControl } from "react-map-gl";
import { acces_token } from "./accestoken";
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mapStateReceived, updateMapState } from "./redux/mapState/slice";
import CustomMarker from "./label";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = acces_token; // Set your mapbox token here
export function Test() {
    const mapState = useSelector((state) => state.mapState);
    const mapMarker = useSelector((state) => state.mapMarker);
    const showMyLocation = useSelector(
        (state) => state.location && state.location.showMyLocation
    );
    const dispatch = useDispatch();

    const [viewport, setViewport] = useState({
        width: 1200,
        height: 600,
        latitude: 52.516806,
        longitude: 13.383309,
        zoom: 8,
    });
    const geolocateStyle = {
        top: 0,
        left: 0,
        margin: 10,
    };
    const positionOptions = { enableHighAccuracy: true };

    useEffect(() => {
        // var options = {
        //     enableHighAccuracy: true,
        //     timeout: 5000,
        //     maximumAge: 0,
        // };
        // function success(pos) {
        //     var crd = pos.coords;
        //     console.log("Your current position is:");
        //     console.log(`Latitude : ${crd.latitude}`);
        //     console.log(`Longitude: ${crd.longitude}`);
        //     console.log(`More or less ${crd.accuracy} meters.`);
        // }
        // function error(err) {
        //     console.warn(`ERROR(${err.code}): ${err.message}`);
        // }
        // navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);

    useEffect(() => {
        console.log("test");
        console.log("map mounted", viewport);
        dispatch(mapStateReceived(viewport));
        //setViewport(mapState);
    }, []);

    return (
        <>
            <ReactMapGL
                {...mapState}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onViewportChange={(nextViewport) => {
                    dispatch(updateMapState(nextViewport));
                    //setViewport(nextViewport);
                }}
            >
                <CustomMarker />
                {mapMarker &&
                    mapMarker.map((marker) => (
                        <Marker
                            key={marker.name}
                            longitude={marker.longitude}
                            latitude={marker.latitude}
                            // offsetLeft={-20}
                            // offsetTop={-10}
                        >
                            <p>{marker.name}</p>
                            <img className="marker" src="pin.png" />
                        </Marker>
                    ))}
                {showMyLocation && (
                    <GeolocateControl
                        style={geolocateStyle}
                        positionOptions={positionOptions}
                        trackUserLocation={true}
                        auto
                    />
                )}
            </ReactMapGL>{" "}
        </>
    );
}

// export class Test extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             viewport: {
//                 latitude: 52.516806,
//                 longitude: 13.383309,
//                 zoom: 10,
//                 bearing: 0,
//                 pitch: 0,
//             },
//         };
//     }

//     render() {
//         return (
//             <div className="mapContainer">
//                 <MapGL
//                     {...this.state.viewport}
//                     width="100vw"
//                     height="80vh"
//                     mapStyle="mapbox://styles/mapbox/dark-v9"

//                     onViewportChange={(viewport) => this.setState({ viewport })}
//                     mapboxApiAccessToken={MAPBOX_TOKEN}
//                 />
//             </div>
//         );
//     }
// }
