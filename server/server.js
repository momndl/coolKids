const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { hash, compare } = require("./bc");
const cookieSession = require("cookie-session");
const db = require("./db");

app.use(compression());
app.use(express.json());

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
    console.log("body", req.body);
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
                                error: "invalid email or password : (",
                            });
                        }
                    }
                );
            } else {
                res.json({
                    success: false,
                    error: "invalid email or password : (",
                });
            }
        })
        .catch((error) =>
            console.log("error in post /login.json with db.regCheck", error)
        );
});

app.post("/playgrounds/getplayground.json", (req, res) => {
    const { place_name, center, id } = req.body;
    const latitude = center[1];
    const longitude = center[0];

    // === maybe not so difficult, switch playground id to mapbox_id in toys for direct search

    async function getPlaygroundData(id) {
        const getPlaygrdId = await db.getPlaygroundId(id);

        if (getPlaygrdId.rowCount > 0) {
            const { id: PlaygrndId } = getPlaygrdId.rows[0];
            const toys = await db.getPlaygroundToys(PlaygrndId);
            const comments = await db.getComments();
            const sortedComments = comments.rows.filter(
                (comment) => comment.playground_id == PlaygrndId
            );

            const yesToys = [];
            const noToys = [];
            for (let key in toys.rows[0]) {
                if (toys.rows[0][key] == true) {
                    if (key == "merry_go_rounds") {
                        key = "Merry-Go-Rounds";
                        console.log("key if", key);
                    } else if (key == "climbing_option") {
                        key = "Climbing Option";
                    }

                    yesToys.push(key.replace("_", "-"));
                } else if (toys.rows[0][key] == false) {
                    if (key == "merry_go_rounds") {
                        key = "Merry-Go-Rounds";
                        console.log("key if", key);
                    } else if (key == "climbing_option") {
                        key = "Climbing Option";
                    }
                    noToys.push(key.replace("_", "-"));
                }
            }

            res.json({
                success: true,
                yesToys,
                noToys,
                PlaygrndId: PlaygrndId,
                comments: sortedComments,
            });
        } else {
            const playgroundId = await db.addPlayground(
                place_name,
                id,
                longitude,
                latitude
            );
            console.log("id? playground", playgroundId);
            const toyCreation = await db.createToys(playgroundId.rows[0].id);
            console.log(
                "logging toycreation so its not red anymore",
                toyCreation
            );
            const message = "No Data added yet, your chance to be the first!";
            res.json({
                success: false,
                message: message,
                id: playgroundId.rows[0].id,
            });
        }
    }
    getPlaygroundData(id);
});

app.post("/playgrounds/upgrade.json", (req, res) => {
    async function updatePlaygrounds() {
        let id = req.body.id;

        if (!req.body.id) {
            const target = req.body.target;

            const playGrndId = await db.addPlayground(
                target.place_name,
                target.id,
                target.center[0],
                target.center[1]
            );

            id = playGrndId.rows[0].id;
            const toyCreation = await db.createToys(id);
            console.log("hmmmm", toyCreation);
        }
        const toys = req.body.toUpdate;

        const myToys = await db.getPlaygroundToys(id);
        if (myToys.rowCount == 0) {
            db.createToys(id);
        }

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

        res.json({ success: true, id: id });
        // neuen spielplatz anlegen
    }
    updatePlaygrounds();
    //HERE WE NEED A DB QUERY TO FIND ->
});

app.post("/playgrounds/remove.json", (req, res) => {
    //console.log("post to playgorunds update");
    const id = req.body.id;
    const toys = req.body.toUpdate;
    async function removeToys() {
        const myToys = await db.getPlaygroundToys(id);
        if (myToys.rowCount == 0) {
            db.createToys(id);
        }

        for (let i = 0; i < toys.length; i++) {
            if (toys[i] == "slide") {
                db.removeSlide(id);
            } else if (toys[i] == "swing") {
                db.removeSwing(id);
            } else if (toys[i] == "merry") {
                db.removeMerry(id);
            } else if (toys[i] == "sandpit") {
                db.removeSandpit(id);
            } else if (toys[i] == "climbing") {
                db.removeClimbing(id);
            } else if (toys[i] == "bench") {
                db.removeBench(id);
            }
        }

        res.json({ success: true });
    }
    removeToys();
});

app.get("/user/getFavorites.json", (req, res) => {
    const userId = req.session.userId;
    // console.log("userId", userId);
    db.getFavorite(userId).then((resp) => {
        console.log("resp fav", resp.rows);

        res.json(resp.rows);
    });
});

app.post("/playgrounds/addFavorite.json", (req, res) => {
    const target = req.body;
    const userId = req.session.userId;
    let playgroundId = 0;

    async function addFavorite() {
        const playgroundCheck = await db.getPlaygroundId(target.id);

        if (playgroundCheck.rowCount == 0) {
            const playGrndId = await db.addPlayground(
                target.place_name,
                target.id,
                target.center[0],
                target.center[1]
            );
            db.createToys(playGrndId.rows[0].id);
            playgroundId = playGrndId.rows[0].id;
        } else {
            playgroundId = playgroundCheck.rows[0].id;
        }

        db.addFavorite(playgroundId, userId)
            .then(() => {
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("error while adding Favorite", err);
                res.json({ success: false });
            });
    }
    addFavorite();
});

app.post("/playgrounds/removeFavorite.json", (req, res) => {
    const userId = req.session.userId;
    const target = req.body;

    async function removeFavorite() {
        const playgroundCheck = await db.getPlaygroundId(target.id);
        const playgroundId = playgroundCheck.rows[0].id;
        db.removeFavorite(playgroundId, userId)
            .then(() => {
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("error while adding Favorite", err);
                res.json({ success: false });
            });
    }

    removeFavorite();
});

app.post("/playgrounds/addComments.json", (req, res) => {
    const userId = req.session.userId;
    const { comment, mapbox_id } = req.body;

    async function addingComments() {
        const playgroundId = await db.getPlaygroundId(mapbox_id);

        const commentId = await db.addComments(
            comment,
            userId,
            playgroundId.rows[0].id
        );
        if (typeof commentId.rows[0].id == "number") {
            console.log("SUCCES");
        }

        res.json({ success: true });
    }

    addingComments();
});

app.post("/playgrounds/search.json", (req, res) => {
    const { search } = req.body;

    if (search == "Slide") {
        db.findPlaygroundWithSlides().then((response) => {
            if (response.rowCount > 0) {
                res.json({ success: true, data: response.rows });
            } else {
                res.json({
                    success: false,
                    message: "no playgrounds found :(",
                });
            }
        });
    } else if (search == "Swing") {
        db.findPlaygroundWithSwings().then((response) => {
            if (response.rowCount > 0) {
                res.json({ success: true, data: response.rows });
            } else {
                res.json({
                    success: false,
                    message: "no playgrounds found :(",
                });
            }
        });
    } else if (search == "Climbing Options") {
        db.findPlaygroundWithClimbing().then((response) => {
            if (response.rowCount > 0) {
                res.json({ success: true, data: response.rows });
            } else {
                res.json({
                    success: false,
                    message: "no playgrounds found :(",
                });
            }
        });
    } else if (search == "Merry-Go-Rounds") {
        db.findPlaygroundWithMerry().then((response) => {
            if (response.rowCount > 0) {
                res.json({ success: true, data: response.rows });
            } else {
                res.json({
                    success: false,
                    message: "no playgrounds found :(",
                });
            }
        });
    } else if (search == "Sandpit") {
        db.findPlaygroundWithSandpits().then((response) => {
            if (response.rowCount > 0) {
                res.json({ success: true, data: response.rows });
            } else {
                res.json({
                    success: false,
                    message: "no playgrounds found :(",
                });
            }
        });
    } else if (search == "Bench") {
        db.findPlaygroundWithBenches().then((response) => {
            if (response.rowCount > 0) {
                res.json({ success: true, data: response.rows });
            } else {
                res.json({
                    success: false,
                    message: "no playgrounds found :(",
                });
            }
        });
    }
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
