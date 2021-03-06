const spicedPg = require("spiced-pg");

const database = "coolkids";

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUserName, dbPassword } = require("../secrets");
    db = spicedPg(
        `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
    );
}

console.log(`[db] Connecting to: ${database}`);

// =================== FUNCTIONS =====================
module.exports.regCheck = (email) => {
    return db.query(
        `SELECT users.password, users.id FROM users WHERE email = $1`,
        [email]
    );
};

module.exports.addUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, password]
    );
};

module.exports.getPlaygroundId = (mapbox_id) => {
    return db.query(`SELECT id from playgrounds WHERE mapbox_id = $1`, [
        mapbox_id,
    ]);
};

module.exports.getPlaygroundToys = (playground_id) => {
    return db.query(
        `
    SELECT slide , swing, climbing AS Climbing_Option, bench, merry AS Merry_Go_Rounds, sandpit FROM toys WHERE playground_id = $1
    `,
        [playground_id]
    );
};

module.exports.updateSlide = (playground_id) => {
    return db.query(`UPDATE toys SET slide = true WHERE playground_id = $1`, [
        playground_id,
    ]);
};

module.exports.updateSwing = (playground_id) => {
    return db.query(`UPDATE toys SET swing = true WHERE playground_id = $1`, [
        playground_id,
    ]);
};

module.exports.updateClimbing = (playground_id) => {
    return db.query(
        `UPDATE toys SET climbing = true WHERE playground_id = $1`,
        [playground_id]
    );
};

module.exports.updateBench = (playground_id) => {
    return db.query(`UPDATE toys SET bench = true WHERE playground_id = $1`, [
        playground_id,
    ]);
};

module.exports.updateMerry = (playground_id) => {
    return db.query(`UPDATE toys SET merry = true WHERE playground_id = $1`, [
        playground_id,
    ]);
};

module.exports.updateSandpit = (playground_id) => {
    return db.query(`UPDATE toys SET sandpit = true WHERE playground_id = $1`, [
        playground_id,
    ]);
};

module.exports.removeSlide = (playground_id) => {
    return db.query(`UPDATE toys SET slide = false WHERE playground_id = $1`, [
        playground_id,
    ]);
};

module.exports.removeSwing = (playground_id) => {
    return db.query(`UPDATE toys SET swing = false WHERE playground_id = $1`, [
        playground_id,
    ]);
};

module.exports.removeClimbing = (playground_id) => {
    return db.query(
        `UPDATE toys SET climbing = false WHERE playground_id = $1`,
        [playground_id]
    );
};

module.exports.removeBench = (playground_id) => {
    return db.query(`UPDATE toys SET bench = false WHERE playground_id = $1`, [
        playground_id,
    ]);
};

module.exports.removeMerry = (playground_id) => {
    return db.query(`UPDATE toys SET merry = false WHERE playground_id = $1`, [
        playground_id,
    ]);
};

module.exports.removeSandpit = (playground_id) => {
    return db.query(
        `UPDATE toys SET sandpit = false WHERE playground_id = $1`,
        [playground_id]
    );
};

module.exports.addFavorite = (playground_id, user_id) => {
    return db.query(
        `INSERT INTO favorites (playground_id, user_id) VALUES ($1, $2)`,
        [playground_id, user_id]
    );
};

module.exports.removeFavorite = (playground_id, user_id) => {
    return db.query(
        `DELETE FROM favorites WHERE playground_id =$1 AND user_id =$2`,
        [playground_id, user_id]
    );
};

// this on first fetch?
module.exports.getFavorite = (user_id) => {
    return db.query(
        `SELECT * FROM playgrounds JOIN favorites ON 
        (playgrounds.id = playground_id AND favorites.user_id = $1)`,
        [user_id]
    );
};

//get comments on playgrounds
module.exports.getComments = () => {
    return db.query(
        `SELECT comment, playground_id, users.first, users.last, TO_CHAR(comments.created_at, 'HH24:MI DD.MM.YY') AS posted FROM comments JOIN users ON comments.user_id=users.id`,
        []
    );
};

module.exports.addComments = (comment, user_id, playground_id) => {
    return db.query(
        `INSERT INTO comments (comment, user_id, playground_id) VALUES ($1, $2, $3) RETURNING id`,
        [comment, user_id, playground_id]
    );
};

// advanced search stuff
// like this -> SELECT * from playgrounds JOIN toys ON sandpit = true
module.exports.addPlayground = (name, mapbox_id, longitude, latitude) => {
    return db.query(
        ` INSERT INTO playgrounds (name, mapbox_id, longitude, latitude) VALUES
 ($1, $2, $3, $4 ) RETURNING ID `,
        [name, mapbox_id, longitude, latitude]
    );
};

module.exports.createToys = (playground_id) => {
    return db.query(`INSERT INTO toys (playground_id) VALUES ($1)`, [
        playground_id,
    ]);
};

module.exports.findPlaygroundWithSlides = () => {
    return db.query(
        `SELECT playgrounds.id, playgrounds.name, playgrounds.mapbox_id, playgrounds.longitude, playgrounds.latitude FROM playgrounds JOIN toys ON slide = true AND toys.playground_id = playgrounds.id`,
        []
    );
};

module.exports.findPlaygroundWithSwings = () => {
    return db.query(
        `SELECT playgrounds.id, playgrounds.name, playgrounds.mapbox_id, playgrounds.longitude, playgrounds.latitude FROM playgrounds JOIN toys ON swing = true AND toys.playground_id = playgrounds.id`,
        []
    );
};

module.exports.findPlaygroundWithClimbing = () => {
    return db.query(
        `SELECT playgrounds.id, playgrounds.name, playgrounds.mapbox_id, playgrounds.longitude, playgrounds.latitude FROM playgrounds JOIN toys ON climbing = true AND toys.playground_id = playgrounds.id`,
        []
    );
};

module.exports.findPlaygroundWithBenches = () => {
    return db.query(
        `SELECT playgrounds.id, playgrounds.name, playgrounds.mapbox_id, playgrounds.longitude, playgrounds.latitude FROM playgrounds JOIN toys ON bench = true AND toys.playground_id = playgrounds.id`,
        []
    );
};

module.exports.findPlaygroundWithMerry = () => {
    return db.query(
        `SELECT playgrounds.id, playgrounds.name, playgrounds.mapbox_id, playgrounds.longitude, playgrounds.latitude FROM playgrounds JOIN toys ON merry = true AND toys.playground_id = playgrounds.id`,
        []
    );
};

module.exports.findPlaygroundWithSandpits = () => {
    return db.query(
        `SELECT playgrounds.id, playgrounds.name, playgrounds.mapbox_id, playgrounds.longitude, playgrounds.latitude FROM playgrounds JOIN toys ON sandpit = true AND toys.playground_id = playgrounds.id`,
        []
    );
};
// SELECT playgrounds.id, playgrounds.name, playgrounds.mapbox_id, playgrounds.longitude, playgrounds.latitude FROM playgrounds JOIN toys ON swing = true AND toys.playground_id = playgrounds.id;

// select comment, users.first, users.last, TO_CHAR(comments.created_at, 'HH24:MI DD.MM.YY') AS posted from comments WHERE playground_id =1 join users on comments.user_id=users.id
