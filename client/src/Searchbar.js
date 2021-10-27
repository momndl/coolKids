import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchResultsReceived } from "./redux/searchReducer/slice";
import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";
import { acces_token } from "./accestoken";
import { updateMapCoordinates } from "./redux/mapState/slice";
import { markerPosReceived } from "./redux/mapMarker/slice";
import { targetDataReceived } from "./redux/target/slice";
import { toggleLocation } from "./redux/location/slice";
import AdvancedSearch from "./AdvancedSearch";

export default function Searchbar() {
    const geocoder = GeocoderService({
        accessToken: acces_token,
    });
    const showMyLocation = useSelector(
        (state) => state.location && state.location.showMyLocation
    );
    const dispatch = useDispatch();
    useEffect(() => {
        //console.log("searchbar mounted");
    }, []);
    const [search, setSearch] = useState("");
    const [advancedSearch, setAdvancedSearch] = useState("");
    const myLocation = useSelector(
        (state) => state.location && state.location.data
    );
    // const state = useSelector((state) => state.state);
    function advancedSearchHandler() {
        if (!advancedSearch) {
            setAdvancedSearch(true);
            setSearch("");
        } else {
            setAdvancedSearch(false);
            setSearch("");
        }
    }
    function toggleMyLocation() {
        if (showMyLocation) {
            dispatch(toggleLocation(false));
        } else {
            dispatch(toggleLocation(true));
        }
    }
    // POSSIBLE HANDLER IN STORAGE.js
    async function searchHandler(e) {
        //const proxi = myLocation.pos.reverse();
        //console.log("proxi yay", proxi);
        console.log("val", e.target.value);
        const query = e.target.value;
        const response = await geocoder
            .forwardGeocode({
                query,
                limit: 10,
                //routing: true, // think i dont need it
                // proximity: proxi, // LAT AND LONG -> now hard coded, we need this from myLocation const
                // types: ["poi", "postcode"], ==== COMMENTED OUT, maybe not neccessaire
                // bbox: [-77.210763, 38.803367, -76.853675, 39.052643], bbox	Limit results to only those contained within the supplied bounding box. Bounding boxes should be supplied as four numbers separated by commas, in minLon,minLat,maxLon,maxLat order. The bounding box cannot cross the 180th meridian.
                // marker: true, -> key does not work
            })
            .send()
            .catch((e) => console.log("no search value", e));

        if (!response) {
            setSearch("");
            return;
        }

        //console.log("res,", response);
        setSearch(response.body.features);
        dispatch(searchResultsReceived(response.body.features));
        //dispatch(searchResultsReceived(response.body.features));
    }
    return (
        <div id="searchbar">
            <input type="text" onChange={searchHandler}></input>
            <button onClick={advancedSearchHandler}>advanced search </button>
            <button onClick={toggleMyLocation}>my location</button>
            {search &&
                search.map((result, i) => (
                    <div className="searchResult" key={i}>
                        <p
                            onClick={() => {
                                dispatch(targetDataReceived(result));
                                dispatch(markerPosReceived(result));
                                dispatch(
                                    updateMapCoordinates(
                                        result.geometry.coordinates
                                    )
                                );
                                setSearch("");
                                //console.log("check", result);
                            }}
                        >
                            {result.place_name}
                        </p>
                    </div>
                ))}
            {advancedSearch && <AdvancedSearch />}
        </div>
    );
}
