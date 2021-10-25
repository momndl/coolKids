import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Login() {
    const [input, setInput] = useState({});
    const [error, setError] = useState("");
    useEffect(() => {
        console.log("login mounted");
    }, []);

    function handleChange({ target }) {
        console.log("someone is typing in an input field");
        setInput({ ...input, [target.name]: target.value });

        console.log("Registration state update:", input);
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
                    console.log("POST /login.json:", resp);
                    if (resp.success) {
                        location.replace("/");
                    } else {
                        setError({ error: resp.error });
                    }
                })
                .catch((err) => {
                    console.log("err in POST /registration.json", err);
                    setError({
                        error: "Something went wrong with registration",
                    });
                })
        );
    }

    return (
        <section id="login">
            <h2>Login</h2>
            {error && <h2 className="regError"> {error.error}</h2>}
            <form>
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
            </form>
            <Link to="/">Not registered? Go here!</Link>
            {/* <Link to="/passwordreset"> forget password?</Link> */}
        </section>
    );
}
// NOTES -> Password Reset is not realistic right now