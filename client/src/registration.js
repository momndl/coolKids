import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Registration() {
    const [input, setInput] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("reg mounted");
    }, []);
    function handleChange({ target }) {
        setInput({ ...input, [target.name]: target.value });
    }

    function handleRegister(e) {
        e.preventDefault();
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
                        // check whats happening here ====
                        location.reload();
                    } else {
                        setError(resp.error);
                    }
                })
                .catch((err) => {
                    console.log("err in POST /registration.json", err);
                    setError(resp.error);
                })
        );
    }
    return (
        <section id="registration">
            <div className="logoDiv">
                <img className="regLogo" src="slide.png" />
                <h1 className="regHeadline"> Cool Kids </h1>
            </div>
            <div className="formContainer">
                <h1 className="headline">Registration</h1>
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
            </div>
        </section>
    );
}
