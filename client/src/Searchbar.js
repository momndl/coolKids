import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchResultsReceived } from "./redux/searchReducer/slice";
import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";
import { acces_token } from "./accestoken";
import { updateMapCoordinates } from "./redux/mapState/slice";
import { markerPosReceived } from "./redux/mapMarker/slice";
import { targetDataReceived } from "./redux/target/slice";
const geocoder = GeocoderService({
    accessToken: acces_token,
});

export default function Searchbar() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("searchbar mounted");
    }, []);
    const [search, setSearch] = useState("");
    // const state = useSelector((state) => state.state);

    async function searchHandler(e) {
        console.log(e.target.value);
        const query = e.target.value;
        const response = await geocoder
            .forwardGeocode({
                query,
                limit: 5,
                bbox: [-77.210763, 38.803367, -76.853675, 39.052643],
                // marker: true, -> key does not work
            })
            .send();
        console.log("res,", response);
        setSearch(response.body.features);
        dispatch(searchResultsReceived(response.body.features));
    }
    return (
        <div id="searchbar">
            <input type="text" onChange={searchHandler}></input>
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
                                console.log("check", result);
                            }}
                        >
                            {result.place_name}
                        </p>
                    </div>
                ))}
        </div>
    );
}
