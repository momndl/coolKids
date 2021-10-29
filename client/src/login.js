import { Link } from "react-router-dom";
import { useState } from "react";
export default function Login() {
    const [input, setInput] = useState({});
    const [error, setError] = useState("");

    function handleChange({ target }) {
        setInput({ ...input, [target.name]: target.value });
    }

    function handleLogin(e) {
        e.preventDefault();
        console.log("you clicked on the button");
        console.log("this.state", input);

        fetch("/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        }).then((resp) =>
            resp
                .json()
                .then((resp) => {
                    if (resp.success) {
                        location.replace("/");
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
        <section id="login">
            <div className="logoDiv">
                <img className="regLogo" src="slide.png" />
                <h1 className="regHeadline"> Cool Kids </h1>
            </div>
            <div className="formContainer">
                <h1 className="headline">Login</h1>
                {error && <h2 className="regError"> {error}</h2>}
                <form className="regForm">
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
                    <button onClick={(e) => handleLogin(e)}>login</button>
                    <Link to="/">Not registered? Click here!</Link>
                </form>
            </div>
        </section>
    );
}
// NOTES -> Password Reset is not realistic right now
