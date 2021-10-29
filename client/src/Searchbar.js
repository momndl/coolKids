import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchResultsReceived } from "./redux/searchReducer/slice";
import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";
import { acces_token } from "./accestoken";
import { updateMapCoordinates } from "./redux/mapState/slice";
import { targetMarkerReceived } from "./redux/targetMarker/slice";
import { targetDataReceived } from "./redux/target/slice";
import { toggleLocation } from "./redux/location/slice";
import AdvancedSearch from "./AdvancedSearch";

export default function Searchbar() {
    const trigger = useSelector((state) => state.trigger);
    const geocoder = GeocoderService({
        accessToken: acces_token,
    });
    const showMyLocation = useSelector(
        (state) => state.location && state.location.showMyLocation
    );
    const dispatch = useDispatch();
    useEffect(() => {
        setSearch("");
        if (advancedSearch) {
            setAdvancedSearch(false);
        }
    }, [trigger]);
    const [search, setSearch] = useState("");
    const [advancedSearch, setAdvancedSearch] = useState("");
    // const myLocation = useSelector(
    //     (state) => state.location && state.location.data
    // );
    //const [query, setQuery] = useState();
    // const state = useSelector((state) => state.state);
    function advancedSearchHandler() {
        if (!advancedSearch) {
            setAdvancedSearch(true);
            setSearch("");
            // dispatch(targetDataReceived(null));
        } else {
            setAdvancedSearch(false);
            setSearch("");
            // dispatch(targetDataReceived(null));
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
        const query = e.target.value;
        const response = await geocoder
            .forwardGeocode({
                query,
                limit: 10,
                //routing: true, // think i dont need it
                proximity: [13.3967488, 52.4663405],

                types: ["poi"],
                bbox: [12.790833, 52.294202, 13.739777, 52.729639],
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
            <input
                type="text"
                placeholder="search for playgrounds"
                onChange={searchHandler}
            ></input>
            <button className="searchBtn" onClick={advancedSearchHandler}>
                advanced search
            </button>
            <button className="searchBtn" onClick={toggleMyLocation}>
                my location
            </button>

            {/* CHANGE DIV STRUCTURE SO WE HAVE RESULT CONTAINER */}
            {search && (
                <div className="searchResultContainer">
                    {search &&
                        search.map((result, i) => (
                            <div className="searchResult" key={i}>
                                <p
                                    onClick={() => {
                                        console.log(result);
                                        dispatch(targetDataReceived(result));
                                        dispatch(targetMarkerReceived(result));
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
                </div>
            )}

            {advancedSearch && (
                <AdvancedSearch toggleAdvSearch={advancedSearchHandler} />
            )}
        </div>
    );
}
