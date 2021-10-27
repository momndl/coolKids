import ReactMapGL, { Marker, GeolocateControl } from "react-map-gl";
import { acces_token } from "./accestoken";
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mapStateReceived, updateMapState } from "./redux/mapState/slice";
import { locationInitPosReceived } from "./redux/location/slice";
import { updateMapCoordinates } from "./redux/mapState/slice";
import CustomMarker from "./label";
import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";
import { targetDataReceived } from "./redux/target/slice";

const MAPBOX_TOKEN = acces_token; // Set your mapbox token here
const geocoder = GeocoderService({
    accessToken: acces_token,
});
export function Map() {
    const mapState = useSelector((state) => state.mapState);
    const searchResults = useSelector((state) => state.searchResults);
    const targetMarker = useSelector(
        (state) => state.targetMarker && state.targetMarker
    );
    const favoriteMarkers = useSelector(
        (state) => state.mapMarker && state.mapMarker[0].favorites
    );
    const showMyLocation = useSelector(
        (state) => state.location && state.location.showMyLocation
    );
    const dispatch = useDispatch();
    let myPos;
    const [viewport, setViewport] = useState({
        width: 1470,
        height: 830,
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
        if (showMyLocation) {
            console.log("TEST", favoriteMarkers);
            console.log("TEST2", searchResults);
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            };
            function success(pos) {
                console.log("pos object", pos);
                const crd = pos.coords;
                console.log("Your current position is:");
                console.log(`Latitude : ${crd.latitude}`);
                console.log(`Longitude: ${crd.longitude}`);
                console.log(`More or less ${crd.accuracy} meters.`);
                myPos = {
                    pos: [crd.latitude, crd.longitude],
                    accuracy: crd.accuracy,
                };
                dispatch(locationInitPosReceived(myPos));
            }
            function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }
            navigator.geolocation.getCurrentPosition(success, error, options);
        }
    }, [showMyLocation]); // listen on showMyLocation just for tests, use myPos on geocoder ->
    // proximity	Bias the response to favor results that are closer to this location, provided as two comma-separated coordinates in longitude,latitude order.
    async function testhandler(e) {
        console.log(
            "hola, this should open a modal with information about the playground"
        );
        const query = e.target.innerText;
        const targetMarker = favoriteMarkers.filter(
            (marker) => marker.name == query
        );
        console.log(targetMarker);
        const coordinates = [
            parseFloat(targetMarker[0].longitude),
            parseFloat(targetMarker[0].latitude),
        ];

        dispatch(updateMapCoordinates(coordinates));
        const response = await geocoder
            .forwardGeocode({
                query,
                limit: 1,
                //routing: true, // think i dont need it
                // proximity: proxi, // LAT AND LONG -> now hard coded, we need this from myLocation const
                types: ["poi"],
                // bbox: [-77.210763, 38.803367, -76.853675, 39.052643], bbox	Limit results to only those contained within the supplied bounding box. Bounding boxes should be supplied as four numbers separated by commas, in minLon,minLat,maxLon,maxLat order. The bounding box cannot cross the 180th meridian.
                // marker: true, -> key does not work
            })
            .send()
            .catch((e) => console.log("no search value", e));

        console.log("huhu", response.body.features);
        // dispatch(targetDataReceived(response.body.features));
    }

    useEffect(() => {
        //console.log("mapmarker", mapMarker);
        dispatch(mapStateReceived(viewport));
        //setViewport(mapState);
    }, []);

    return (
        <>
            <ReactMapGL
                {...mapState}
                mapStyle="mapbox://styles/mapbox/navigation-day-v1"
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onViewportChange={(nextViewport) => {
                    dispatch(updateMapState(nextViewport));
                    //setViewport(nextViewport);
                }}
            >
                <CustomMarker />
                {favoriteMarkers &&
                    favoriteMarkers.map((marker, i) => (
                        <Marker
                            key={i}
                            longitude={parseFloat(marker.longitude)}
                            latitude={parseFloat(marker.latitude)}
                        >
                            <div
                                className="favoriteMarkerDiv"
                                onClick={(e) => testhandler(e)}
                            >
                                <p>{marker.name}</p>{" "}
                            </div>
                            <img
                                onClick={testhandler}
                                className="marker"
                                src="pin.png"
                            />
                        </Marker>
                    ))}
                {searchResults &&
                    searchResults.map((result, i) => (
                        <Marker
                            key={i}
                            longitude={result.center[0]}
                            latitude={result.center[1]}
                        >
                            <div
                                className="searchMarkerDiv"
                                onClick={(e) => testhandler(e)}
                            >
                                <p>{result.text}</p>{" "}
                            </div>
                            <img
                                onClick={testhandler}
                                className="marker"
                                src="pin.png"
                            />
                        </Marker>
                    ))}

                {targetMarker &&
                    targetMarker.map((marker, i) => (
                        <Marker
                            key={i}
                            longitude={marker.center[0]}
                            latitude={marker.center[1]}
                        >
                            <div className="markerDiv" onClick={testhandler}>
                                <p>{marker.place_name}</p>{" "}
                            </div>
                            <img
                                onClick={testhandler}
                                className="marker"
                                src="pin.png"
                            />
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
