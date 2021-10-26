import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdatePlaygroundInfo from "./UpdatePlaygroundInfo";

import Searchbar from "./Searchbar";

export default function Usermenu() {
    const target = useSelector((state) => state.target);
    const [toys, setToys] = useState("");
    const [comments, setComments] = useState("");
    const [showUpdateInfo, setShowUpdateInfo] = useState(false);
    const dispatch = useDispatch();

    function updateHandler() {
        console.log("hääändler");
        if (!showUpdateInfo) {
            setShowUpdateInfo(true);
        } else {
            setShowUpdateInfo(false);
        }
    }

    useEffect(() => {
        console.log("menu mounted");
    }, []);

    useEffect(() => {
        console.log("menu mounted", target);
        if (target) {
            fetch("/playgrounds/getplayground.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(target.data),
            }).then((resp) =>
                resp
                    .json()
                    .then((resp) => {
                        console.log(
                            "RES POST /playgrounds/getplayground.json",
                            resp
                        );
                        const toys = {
                            noToys: resp.noToys,
                            yesToys: resp.yesToys,
                        };
                        console.log("toys", toys);
                        console.log("comments", resp.comments);
                        console.log("playground id", resp.PlaygrndId);
                        setToys(toys);
                        setComments(resp.comments);
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
                    <p>{target.data.text}</p>
                    <p>
                        {target.data.properties.address},{" "}
                        {target.data.context[0].text}
                    </p>
                    <button> add to favorites </button>
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
                                <p key={i}>{comment.comment}</p>
                            ))}
                    </div>
                    <button onClick={updateHandler}>add information</button>
                </div>
            )}
            {showUpdateInfo && (
                <UpdatePlaygroundInfo
                    updateHandler={updateHandler}
                    name={target.data.text}
                    address={target.data.properties.address}
                    PlaygrndId={toys.PlaygrndId}
                />
            )}
        </nav>
    );
}
