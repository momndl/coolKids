import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { advancedMarkerReceived } from "./redux/advancedSearchMarkers/slice";
import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";
import { acces_token } from "./accestoken";
import { updateMapCoordinates } from "./redux/mapState/slice";
import { targetDataReceived } from "./redux/target/slice";
import { targetMarkerReceived } from "./redux/targetMarker/slice";
import { triggerReceived } from "./redux/trigger/slice";

export default function AdvancedSearch(props) {
    const geocoder = GeocoderService({
        accessToken: acces_token,
    });
    const dispatch = useDispatch();
    const advancedMarker = useSelector((state) => state.advancedMarker);
    const [error, setError] = useState("");
    function searchPlaygrounds(e) {
        e.preventDefault();

        fetch("/playgrounds/search.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ search: e.target.innerText }),
        }).then((resp) =>
            resp
                .json()
                .then((resp) => {
                    console.log("POST /searchplaygrounds.json:", resp);
                    if (resp.success) {
                        setError("");

                        dispatch(advancedMarkerReceived(resp.data));
                    } else if (!resp.success) {
                        dispatch(advancedMarkerReceived(null));
                        setError(resp.message);
                    }
                })
                .catch((err) => {
                    console.log("err in POST /registration.json", err);
                })
        );
    }

    async function advancedHandler(e) {
        console.log("clikk");
        const query = e.target.innerText;
        console.log(query);
        const response = await geocoder
            .forwardGeocode({
                query,
                limit: 1,
                bbox: [12.790833, 52.294202, 13.739777, 52.729639],
                proximity: [13.3967488, 52.4663405],
                types: ["poi"],
            })
            .send()
            .catch((e) => console.log("no search value", e));
        const coordinates = [
            response.body.features[0].center[0],
            response.body.features[0].center[1],
        ];
        dispatch(updateMapCoordinates(coordinates));
        console.log(response.body.features[0].center[1]);
        // lat
        console.log(response.body.features[0].center[0]);
        //lang
        dispatch(targetDataReceived(response.body.features[0]));
        dispatch(targetMarkerReceived(response.body.features[0]));
        //dispatch(triggerReceived("go!"));
        props.toggleAdvSearch();
    }

    function removeResults() {
        setError("");
        dispatch(advancedMarkerReceived(null));
    }

    return (
        <div id="advancedSearchContainer">
            <span>advanced search:</span>
            <button onClick={removeResults}>remove search results</button>
            <button onClick={searchPlaygrounds}>Slide </button>
            <button onClick={searchPlaygrounds}>Swing </button>
            <button onClick={searchPlaygrounds}>Climbing Options </button>
            <button onClick={searchPlaygrounds}>Merry-Go-Rounds </button>
            <button onClick={searchPlaygrounds}>Sandpit </button>
            <button onClick={searchPlaygrounds}>Bench </button>
            {error && <h2 className="advSearchError">{error}</h2>}
            <div className="advSearchResults">
                {advancedMarker &&
                    advancedMarker.map((result, i) => (
                        <div key={i}>
                            <p onClick={advancedHandler}>{result.name}</p>{" "}
                        </div>
                    ))}
            </div>
        </div>
    );
}

// old return with checkboxes:
// return (
//     <div id="advancedSearchContainer">
//         <span>advanced search:</span>
//         <form>
//             <input type="checkbox" id="slide" name="slide" />
//             <label htmlFor="slide">Slide</label>
//             <input type="checkbox" id="swing" name="swing" />
//             <label htmlFor="swing">Swing</label>
//             <input type="checkbox" id="climbing" name="climbing" />
//             <label htmlFor="climbing">Climbing Options</label>
//             <input type="checkbox" id="bench" name="bench" />
//             <label htmlFor="bench">Bench</label>
//             <input type="checkbox" id="merry" name="merry" />
//             <label htmlFor="merry">Merry-Go-Rounds</label>
//             <input type="checkbox" id="sandpit" name="sandpit" />
//             <label htmlFor="sandpit">Sandpit</label>
//             <button onClick={searchPlaygrounds}>submit</button>
//         </form>
//     </div>
// );
