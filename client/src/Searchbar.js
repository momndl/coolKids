import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchResultsReceived } from "./redux/searchReducer/slice";
import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";
import { acces_token } from "./accestoken";
import { updateMapCoordinates } from "./redux/mapState/slice";
import { markerPosReceived } from "./redux/mapMarker/slice";
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
            .forwardGeocode({ query, limit: 5 })
            .send();
        console.log("res,", response.body.features);
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
                                dispatch(markerPosReceived(result));
                                dispatch(
                                    updateMapCoordinates(
                                        result.geometry.coordinates
                                    )
                                );
                                console.log(result.geometry.coordinates);
                            }}
                        >
                            {result.place_name}
                        </p>
                    </div>
                ))}
        </div>
    );
}
