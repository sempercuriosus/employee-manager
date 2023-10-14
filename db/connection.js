const mysql = require("mysql2");

const connection = mysql.createConnection({
    // Host
    host: "localhost",
    // Your username
    user: "root",
    // Your password
    password: "",
    // Default Database
    database: "employees"
});

connection.connect(function (connectionError) {
    if (connectionError) {
        throw connectionError;
    }
});

module.exports = connection;
