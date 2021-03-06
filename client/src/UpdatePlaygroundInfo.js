import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { targetDataReceived } from "./redux/target/slice";
import { triggerReceived } from "./redux/trigger/slice";

export default function UpdatePlaygroundInfo(props) {
    const dispatch = useDispatch();
    const target = useSelector((state) => state.target && state.target.data);
    //const [playgroundId, setPlaygroundId] = useState("");
    useEffect(() => {
        console.log("mounted wuhuhuhuh", props);
    }, []);

    function submitHandler(e) {
        e.preventDefault();

        const toUpdate = [];
        const checked = document.querySelectorAll(".updateCheckbox:checked");
        for (let i = 0; i < checked.length; i++) {
            toUpdate.push(checked[i].id);
        }

        fetch("/playgrounds/upgrade.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: props.PlaygrndId,
                toUpdate: toUpdate,
                target: target,
            }),
        }).then((resp) =>
            resp
                .json()
                .then((resp) => {
                    console.log(
                        "RES POST /playgrounds/UPDATEgetplayground.json",
                        resp
                    );
                    if (resp.success) {
                        dispatch(triggerReceived("go!"));
                    }
                    //setPlaygroundId(resp.id);
                })
                .catch((err) => {
                    console.log("err in POST /upgrade.json", err);
                })
        );
        props.updateHandler();
    }
    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("tipped in comment", e.target.value);

            fetch("/playgrounds/addComments.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comment: e.target.value,
                    mapbox_id: target.id,
                }),
            }).then((resp) =>
                resp
                    .json()
                    .then((resp) => {
                        console.log(
                            "RES POST /playgrounds/addCOMMENT.json",
                            resp
                        );
                        if (resp.success) {
                            props.updateHandler();
                            dispatch(triggerReceived("go!"));
                        }
                        //setPlaygroundId(resp.id);
                    })
                    .catch((err) => {
                        console.log("err in POST /upgrade.json", err);
                    })
            );

            e.target.value = "";
        }
    };
    function submitRemoveHandler(e) {
        e.preventDefault();

        const toUpdate = [];
        const checked = document.querySelectorAll(".updateCheckbox:checked");
        for (let i = 0; i < checked.length; i++) {
            toUpdate.push(checked[i].id);
        }
        console.log("checked:", toUpdate);
        fetch("/playgrounds/remove.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: props.PlaygrndId, toUpdate: toUpdate }),
        }).then((resp) =>
            resp
                .json()
                .then((resp) => {
                    console.log(
                        "RES POST /playgrounds/getplayground.json",
                        resp
                    );
                    if (resp.success) {
                        props.updateHandler();
                        dispatch(triggerReceived("go!"));
                    }
                })
                .catch((err) => {
                    console.log("err in POST /remove.json", err);
                })
        );
    }

    return (
        <div className="updatePlaygroundContainer">
            <div className="updateGridRow1">
                <h3>Update {props.name}</h3>
            </div>
            <p className="closer" onClick={props.updateHandler}>
                x
            </p>
            <div className="updateGridRow2">
                <p> see something thats not listed?</p>
                <form>
                    <label htmlFor="slide">
                        <input
                            className="updateCheckbox"
                            type="checkbox"
                            id="slide"
                            name="slide"
                        />{" "}
                        Slide
                    </label>

                    <label htmlFor="swing">
                        <input
                            className="updateCheckbox"
                            type="checkbox"
                            id="swing"
                            name="swing"
                        />{" "}
                        Swing
                    </label>

                    <label htmlFor="climbing">
                        {" "}
                        <input
                            className="updateCheckbox"
                            type="checkbox"
                            id="climbing"
                            name="climbing"
                        />{" "}
                        Climbing Options
                    </label>

                    <label htmlFor="bench">
                        {" "}
                        <input
                            className="updateCheckbox"
                            type="checkbox"
                            id="bench"
                            name="bench"
                        />{" "}
                        Bench
                    </label>

                    <label htmlFor="merry">
                        <input
                            className="updateCheckbox"
                            type="checkbox"
                            id="merry"
                            name="merry"
                        />{" "}
                        Merry-Go-Rounds
                    </label>

                    <label htmlFor="sandpit">
                        <input
                            className="updateCheckbox"
                            type="checkbox"
                            id="sandpit"
                            name="sandpit"
                        />{" "}
                        Sandpit
                    </label>
                    <button
                        className="updateBtn"
                        onClick={(e) => submitHandler(e)}
                    >
                        submit
                    </button>
                </form>
            </div>

            <div className="updateGridRow3">
                <p> missing something thats listed?</p>
                <form>
                    <label htmlFor="slide">
                        <input
                            className="updateCheckbox"
                            type="checkbox"
                            id="slide"
                            name="slide"
                        />{" "}
                        Slide
                    </label>

                    <label htmlFor="swing">
                        <input
                            className="updateCheckbox"
                            type="checkbox"
                            id="swing"
                            name="swing"
                        />{" "}
                        Swing
                    </label>

                    <label htmlFor="climbing">
                        {" "}
                        <input
                            className="updateCheckbox"
                            type="checkbox"
                            id="climbing"
                            name="climbing"
                        />{" "}
                        Climbing Options
                    </label>

                    <label htmlFor="bench">
                        {" "}
                        <input
                            className="updateCheckbox"
                            type="checkbox"
                            id="bench"
                            name="bench"
                        />{" "}
                        Bench
                    </label>

                    <label htmlFor="merry">
                        <input
                            className="updateCheckbox"
                            type="checkbox"
                            id="merry"
                            name="merry"
                        />{" "}
                        Merry-Go-Rounds
                    </label>

                    <label htmlFor="sandpit">
                        <input
                            className="updateCheckbox"
                            type="checkbox"
                            id="sandpit"
                            name="sandpit"
                        />{" "}
                        Sandpit
                    </label>
                    <button
                        className="updateBtn"
                        onClick={(e) => submitRemoveHandler(e)}
                    >
                        submit
                    </button>
                </form>
            </div>
            <div className="updateGridRow4">
                <p>share your opinion!</p>
                <textarea
                    cols="35"
                    rows="5"
                    placeholder="Remember, be nice!"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
        </div>
    );
}
