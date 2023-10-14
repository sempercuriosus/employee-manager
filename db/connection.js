const mysql = require("mysql2");
const defaultDB = "employees";

const connection_pool = mysql.createPool({
    // Host
    host: "localhost",
    // Your username
    user: "root",
    // Your password
    password: "keys@33",
    // Default Database
    database: defaultDB,
    connectionLimit: 15
});

connection_pool.on("acquire", () => {
    console.log("");
    console.info("You have connected to the [ " + defaultDB + " ] database!");
});

connection_pool.on("release", () => {
    console.log("");
    console.info("Connection released.");
});

connection_pool.on("close", () => {
    console.log("");
    console.info("Connection closed.");
});

connection_pool.on("error", (error) => {
    console.log("");
    console.error("There was an error with the database connection.", "", "See the details");
    console.error(error);
});

module.exports = connection_pool;
