export default function AdvancedSearch() {
    function searchPlaygrounds(e) {
        e.preventDefault();
        console.log("you clicked on the button");
        console.log("this.state", e.target);
        const values = Array.from(
            document.querySelectorAll("input[type=checkbox]:checked")
        )
            .map((item) => item.name)
            .join(",");
        console.log("values", values);
        const myArr = values.split(",");
        console.log("test", myArr);
        fetch("/playgrounds/search.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ search: myArr }),
        }).then((resp) =>
            resp
                .json()
                .then((resp) => {
                    console.log("POST /searchplaygrounds.json:", resp);
                    //     if (resp.success) {
                    //         location.replace("/");
                    //     } else {
                    //         setError({ error: resp.error });
                    //     }
                })
                .catch((err) => {
                    console.log("err in POST /registration.json", err);
                    // setError({
                    //     error: "Something went wrong with registration",
                    // });
                })
        );
    }
    return (
        <div id="advancedSearchContainer">
            <span>advanced search:</span>
            <form>
                <input type="checkbox" id="slide" name="slide" />
                <label htmlFor="slide">Slide</label>
                <input type="checkbox" id="swing" name="swing" />
                <label htmlFor="swing">Swing</label>
                <input type="checkbox" id="climbing" name="climbing" />
                <label htmlFor="climbing">Climbing Options</label>
                <input type="checkbox" id="bench" name="bench" />
                <label htmlFor="bench">Bench</label>
                <input type="checkbox" id="merry" name="merry" />
                <label htmlFor="merry">Merry-Go-Rounds</label>
                <input type="checkbox" id="sandpit" name="sandpit" />
                <label htmlFor="sandpit">Sandpit</label>
                <button onClick={searchPlaygrounds}>submit</button>
            </form>
        </div>
    );
}
