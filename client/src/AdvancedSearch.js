import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { advancedMarkerReceived } from "./redux/advancedSearchMarkers/slice";

export default function AdvancedSearch() {
    const dispatch = useDispatch();
    const advancedMarker = useSelector((state) => state.advancedMarker);
    const [error, setError] = useState("");
    function searchPlaygrounds(e) {
        e.preventDefault();
        console.log(e.target.innerText);

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
                        console.log("succes!, do something");
                        dispatch(advancedMarkerReceived(resp.data));
                    } else if (!resp.success) {
                        console.log("nothing found, message: ", resp.message);
                        dispatch(advancedMarkerReceived(null));
                        setError(resp.message);
                    }
                })
                .catch((err) => {
                    console.log("err in POST /registration.json", err);
                })
        );
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
                            {" "}
                            <p>{result.name}</p>{" "}
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
