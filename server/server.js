const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { hash, compare } = require("./bc");
const cookieSession = require("cookie-session");
const db = require("./db");
const cryptoRandomString = require("crypto-random-string");

app.use(compression());
app.use(express.json()); // we use this middleware to parse JSON requests coming in!

let secrets;
process.env.NODE_ENV === "production"
    ? (secrets = process.env)
    : (secrets = require("../secrets.json"));

app.use(
    cookieSession({
        secret: `${secrets.cookieSecret}`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.post("/registration.json", (req, res) => {
    const { first, last, email, password } = req.body;

    // make this async=====================================================
    if (password && first && last && email) {
        db.regCheck(email)
            .then((data) => {
                if (!data.rows[0]) {
                    hash(password).then((hashedPW) => {
                        db.addUser(first, last, email, hashedPW)
                            .then((id) => {
                                req.session.userId = id.rows[0].id;
                                res.json({
                                    success: true,
                                    userId: id.rows[0].id,
                                });
                            })
                            .catch((error) => {
                                console.log("error in post reg", error);
                                res.json({
                                    success: false,
                                    error: "error :( please try again",
                                });
                            });
                    });
                } else {
                    res.json({
                        success: false,
                        error: "email already in use",
                    });
                }
            })
            .catch((error) =>
                console.log(
                    "error in post /registration.json with db.regCheck",
                    error
                )
            );
    } else {
        res.json({
            success: false,
            error: "please fill out all input fields",
        });
    }
});

app.post("/login.json", (req, res) => {
    const { email, password } = req.body;

    db.regCheck(email)
        .then((data) => {
            if (data.rows[0]) {
                compare(password, data.rows[0].password).then(
                    (passwordMatch) => {
                        if (passwordMatch) {
                            req.session.userId = data.rows[0].id;
                            res.json({
                                success: true,
                                userId: data.rows[0].id,
                            });
                        } else {
                            res.json({
                                success: false,
                                error: "invalid email or password :(",
                            });
                        }
                    }
                );
            } else {
                res.json({
                    success: false,
                    error: "invalid email or password :(",
                });
            }
        })
        .catch((error) =>
            console.log("error in post /login.json with db.regCheck", error)
        );
});

app.post("/playgrounds/getplayground.json", (req, res) => {
    console.log("fetched getplayground");
    console.log("data", req.body);
    const { text, center, id } = req.body;
    const latitude = center[1];
    const longitude = center[0];
    const address = `${req.body.properties.address}, ${req.body.context[0].text} `;
    console.log("id", id);
    // === maybe not so difficult, switch playground id to mapbox_id in toys for direct search

    async function getPlaygroundData(id) {
        const getPlaygrdId = await db.getPlaygroundId(id);
        console.log("hallo jajadu", getPlaygrdId.rowCount);
        if (getPlaygrdId.rowCount > 0) {
            const { id: PlaygrndId } = getPlaygrdId.rows[0];
            const toys = await db.getPlaygroundToys(PlaygrndId);
            const comments = await db.getComments(PlaygrndId);
            console.log("toys", toys);
            console.log("comments", comments);
            const yesToys = [];
            const noToys = [];
            for (const key in toys.rows[0]) {
                if (toys.rows[0][key] == true) {
                    yesToys.push(key);
                } else if (toys.rows[0][key] == false) {
                    noToys.push(key);
                }
            }

            res.json({
                success: true,
                yesToys,
                noToys,
                PlaygrndId: PlaygrndId,
                comments: comments.rows,
            });
        } else {
            const message = "No Data added yet, your chance to be the first!";
            res.json({ success: false, message: message });
        }

        // try catch so send error messages =====================================0
    }
    getPlaygroundData(id);
    // {target.data.properties.address},{" "}
    //                     {target.data.context[0].text}
});

app.post("/playgrounds/upgrade.json", (req, res) => {
    async function updatePlaygrounds() {
        let id = req.body.id;

        console.log("EVERYTHING", req.body);
        if (!id) {
            const target = req.body.target;

            const playGrndId = await db.addPlayground(
                target.place_name,
                target.id,
                target.center[0],
                target.center[1]
            );
            //console.log("testtttt", playGrndId.rows[0].id);
            id = playGrndId.rows[0].id;
            const toyCreation = await db.createToys(id);
            console.log("hmmmm", toyCreation);
        }
        const toys = req.body.toUpdate;
        console.log("body", toys);
        console.log("id", id);

        for (let i = 0; i < toys.length; i++) {
            if (toys[i] == "slide") {
                db.updateSlide(id);
                // console.log("update slide"); s
            } else if (toys[i] == "swing") {
                db.updateSwing(id);
                // console.log("update swing");
            } else if (toys[i] == "merry") {
                db.updateMerry(id);
                //  console.log("update merry");
            } else if (toys[i] == "sandpit") {
                db.updateSandpit(id);
                // console.log("update sandpit");
            } else if (toys[i] == "climbing") {
                db.updateClimbing(id);
                console.log("updated climbing");
            } else if (toys[i] == "bench") {
                db.updateBench(id);
                // console.log("update bench");
            }
        }

        res.json({ success: true });
        // neuen spielplatz anlegen
    }
    updatePlaygrounds();
    // HERE WE NEED A DB QUERY TO FIND ->
});

app.post("/playgrounds/remove.json", (req, res) => {
    console.log("post to playgorunds update");
    const id = req.body.id;
    const toys = req.body.toUpdate;
    console.log("body", toys);
    console.log("id", id);

    for (let i = 0; i < toys.length; i++) {
        if (toys[i] == "slide") {
            db.removeSlide(id);
            // console.log("update slide");
        } else if (toys[i] == "swing") {
            db.removeSwing(id);
            // console.log("update swing");
        } else if (toys[i] == "merry") {
            db.removeMerry(id);
            //  console.log("update merry");
        } else if (toys[i] == "sandpit") {
            db.removeSandpit(id);
            // console.log("update sandpit");
        } else if (toys[i] == "climbing") {
            db.removeClimbing(id);
            console.log("updated climbing");
        } else if (toys[i] == "bench") {
            db.removeBench(id);
            // console.log("update bench");
        }
    }

    res.json({ success: true });
});

app.get("/user/getFavorites.json", (req, res) => {
    const userId = req.session.userId;
    console.log("userId", userId);
    db.getFavorite(userId).then((resp) => {
        console.log("resp fav", resp.rows[0]);

        res.json(resp.rows[0]);
    });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.json({ success: true });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
