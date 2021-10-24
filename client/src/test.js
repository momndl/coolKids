import ReactMapGL, { Marker } from "react-map-gl";
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
    const dispatch = useDispatch();
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 52.516806,
        longitude: 13.383309,
        zoom: 8,
    });
    let markers;

    useEffect(() => {
        if (mapMarker) {
            console.log("mapMarker", mapMarker);
            markers = mapMarker.map((marker) => (
                <Marker
                    key={marker.name}
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <p>hello</p>
                    {/* <img src="/pin.png" /> */}
                </Marker>
            ));
            console.log(markers);
        }
    }, [mapMarker]);

    useEffect(() => {
        console.log("map mounted", viewport);
        dispatch(mapStateReceived(viewport));
        //setViewport(mapState);
    }, []);

    return (
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
            {/* {markers} */}
        </ReactMapGL>
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
