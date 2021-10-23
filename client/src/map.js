import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";
import { acces_token } from "./accestoken";
import { useDispatch, useSelector } from "react-redux";
import Searchbar from "./Searchbar";

mapboxgl.accessToken = acces_token;

const geocoder = GeocoderService({
    accessToken: acces_token,
});

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(13.383309);
    const [lat, setLat] = useState(52.516806);
    const [zoom, setZoom] = useState(10.5);

    useEffect(() => {
        console.log("hi");
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });
    }, [lng]);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    }, []);

    //
    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
            <Searchbar />
        </div>
    );
}
