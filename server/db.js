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

// this on first fetch?
module.exports.getFavorite = (user_id) => {
    return db.query(
        `SELECT * FROM playgrounds JOIN favorites ON 
        (playgrounds.id = playground_id AND favorites.user_id = $1)`,
        [user_id]
    );
};

//get comments on playgrounds
module.exports.getComments = (playground_id) => {
    return db.query(
        `SELECT id, comment, user_id FROM comments WHERE playground_id = $1`,
        [playground_id]
    );
};

// advanced search stuff
// like this -> SELECT * from playgrounds JOIN toys ON sandpit = true
