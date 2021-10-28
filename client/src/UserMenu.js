import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdatePlaygroundInfo from "./UpdatePlaygroundInfo";
import {
    removeFavoriteMarker,
    addFavoriteMarker,
} from "./redux/mapMarker/slice";

import Searchbar from "./Searchbar";

export default function Usermenu() {
    const target = useSelector((state) => state.target && state.target.data);
    const favoriteMarkers = useSelector(
        (state) => state.mapMarker && state.mapMarker[0].favorites
    );
    const [toys, setToys] = useState("");
    const [comments, setComments] = useState("");
    const [noDataMessage, setNoDataMessage] = useState("");
    const [showUpdateInfo, setShowUpdateInfo] = useState(false);
    const [addFavorite, setAddFavorite] = useState(true);
    const [removeFavorite, setRemoveFavorite] = useState("");
    const [playgroundId, setplaygroundId] = useState("");
    const [addRemoveBtnText, setAddRemoveBtnText] = useState("add as favorite"); // we dont use this
    const [test, setTest] = useState("");

    const dispatch = useDispatch();

    function updateHandler() {
        if (!showUpdateInfo) {
            setShowUpdateInfo(true);
        } else {
            setShowUpdateInfo(false);
        }
    }

    function removeFavHandler() {
        fetch("/playgrounds/removeFavorite.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(target),
        }).then((resp) =>
            resp
                .json()
                .then((resp) => {
                    console.log("RES POST /playgrounds/removeFAV.json", resp);
                    if (resp.success) {
                        setRemoveFavorite(false);
                        setAddFavorite(true);
                        console.log("success!, dispatch now", target.data);
                        dispatch(removeFavoriteMarker(target.data));
                    }
                })
                .catch((err) => {
                    console.log("err in POST /removeFav.json", err);
                    // setError({
                    //     error: "Something went wrong with registration",
                    // });
                })
        );

        console.log("button removefav clikkked");
    }

    function favHandler() {
        fetch("/playgrounds/addFavorite.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(target),
        }).then((resp) =>
            resp
                .json()
                .then((resp) => {
                    console.log("RES POST /playgrounds/addFAV.json", resp);
                    if (resp.success) {
                        setRemoveFavorite(true);
                        setAddFavorite(false);
                        dispatch(addFavoriteMarker(target.data));
                        console.log("succes adding fav");
                    } else if (!resp.success) {
                        console.log("no succes adding fav");
                    }
                })
                .catch((err) => {
                    console.log("err in POST /favHandler.json", err);
                })
        );

        console.log("button fav clikkked");
    }

    useEffect(() => {
        console.log("menu mounted");
    }, []);

    useEffect(() => {
        console.log("menu mounted", target);
        if (target) {
            for (let i = 0; i < favoriteMarkers.length; i++) {
                if (target.id == favoriteMarkers[i].mapbox_id) {
                    setAddFavorite(false);
                    setRemoveFavorite(true);
                    break;
                } else {
                    setAddFavorite(true);
                    setRemoveFavorite(false);
                }
            }
            fetch("/playgrounds/getplayground.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(target),
            }).then((resp) =>
                resp
                    .json()
                    .then((resp) => {
                        console.log(
                            "RES POST /playgrounds/getplayground.json",
                            resp
                        );

                        if (resp.success) {
                            const toys = {
                                noToys: resp.noToys,
                                yesToys: resp.yesToys,
                            };
                            // console.log("toys", toys);
                            // console.log("comments", resp.comments);
                            // console.log("playground id", resp.PlaygrndId);
                            setToys(toys);
                            setComments(resp.comments);
                            setplaygroundId(resp.PlaygrndId);
                            setNoDataMessage("");

                            if (
                                !resp.noToys.length &&
                                !resp.yesToys.length &&
                                !comments.length
                            ) {
                                setNoDataMessage(
                                    "No Data added yet, your chance to be the first!"
                                );
                            }
                        } else if (!resp.success) {
                            setToys("");
                            setComments("");
                            setNoDataMessage(resp.message);
                            setplaygroundId(resp.id);
                        }
                        setTest(true);
                        console.log(test);
                    })
                    .catch((err) => {
                        console.log("err in POST /registration.json", err);
                        // setError({
                        //     error: "Something went wrong with registration",
                        // });
                    })
            );
        }
    }, [target]);

    return (
        <nav id="side-nav">
            <Searchbar />

            {target && (
                <div className="searchTarget">
                    <p>{target.place_name}</p>

                    {addFavorite && (
                        <button onClick={favHandler}> add to favorites </button>
                    )}
                    {removeFavorite && (
                        <button onClick={removeFavHandler}>
                            remove as favorite
                        </button>
                    )}

                    <div className="hasToysContainer">
                        {toys &&
                            toys.yesToys.map((toy, i) => <p key={i}>{toy}</p>)}
                    </div>
                    <div className="noToysContainer">
                        {toys &&
                            toys.noToys.map((toy, i) => <p key={i}>{toy}</p>)}
                    </div>

                    <div className="commentsContainer">
                        {comments &&
                            comments.map((comment, i) => (
                                <div className="soloComment" key={i}>
                                    <p>{comment.comment}</p>
                                    <span>
                                        {comment.first} {comment.last} ||{" "}
                                        {comment.posted}
                                    </span>
                                </div>
                            ))}
                    </div>
                    {noDataMessage && (
                        <>
                            <h3>{noDataMessage}</h3>
                        </>
                    )}
                    <button onClick={updateHandler}>add information</button>
                </div>
            )}
            {showUpdateInfo && (
                <UpdatePlaygroundInfo
                    updateHandler={updateHandler}
                    PlaygrndId={playgroundId}
                />
            )}
        </nav>
    );
}
