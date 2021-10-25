import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Registration() {
    const [input, setInput] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("reg mounted");
    }, []);
    function handleChange({ target }) {
        console.log("someone is typing in an input field");
        setInput({ ...input, [target.name]: target.value });

        console.log("Registration state update:", input);
    }

    function handleRegister(e) {
        e.preventDefault(); // to prevent the refresh that would happen otherwise
        console.log("you clicked on the button");
        console.log("this.state", input);
        // now we'll want to make a fetch to register our user
        fetch("/registration.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        }).then((resp) =>
            resp
                .json()
                .then((resp) => {
                    console.log("POST /registrations.json:", resp);
                    if (resp.success) {
                        console.log("hat geklappt frau schwarz");
                        // this.setState({ userId: resp.userId });
                        location.reload();
                        // console.log("check id", this.state);
                    } else {
                        console.log("hat nicht geklappt, sad face");
                        setError({ error: resp.error });
                    }
                    // depending on whether or not our user successfully registered we now want to do either:
                    // a: user successfully registered, the should be send to the logged in experience, in this
                    // case we want to rerun our fetch from start.js
                    // and we can trigger that with the help of location.reload()
                    // b: sth went wrong we want to have our registration component
                    // to render with an error message
                })
                .catch((err) => {
                    console.log("err in POST /registration.json", err);
                    setError({ error: resp.error });
                    // update the error property in state!
                })
        );
    }
    return (
        <section>
            <h1>Registration</h1>
            {error && <h2 className="regError"> {error}</h2>}
            <form className="regForm">
                <input
                    type="text"
                    name="first"
                    placeholder="first name"
                    onChange={handleChange}
                ></input>
                <input
                    type="text"
                    name="last"
                    placeholder="last name"
                    onChange={handleChange}
                ></input>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                ></input>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                ></input>
                <button onClick={(e) => handleRegister(e)}>register</button>
                <Link to="/login">Already registered? Please login</Link>
            </form>
        </section>
    );
}
