
// establish connection
const connection = require("../connection");

/**
 * @name Department
 * @classdesc contains a constructor and several functions related to the Department
 * 
 * One can: 
 * - View Departments
 * - Add Departments
 */
class Department {
    /**
    * Property List for Department Class
    * @property {} connection is the connection established with the target database.
    */
    constructor () {
        this.connection = connection;
    };

    // Function List in Department Class
    //

    /**
     * @name view Lists all of the Departments found in the database
     * @returns a Promise Object containing ALL current items
    */
    view () {
        console.info("[ view ] : called");

        // the point is to return a Promise object, from which, data can be extrapolated, but here we return a Promise back to the index.js for manipulation.
        const query = `
        SELECT id as Department_ID
            , name as Department_Name
        FROM department
        ORDER BY id
        ;
        `;

        return this.connection.promise().query(query);

    }; //  [ end : view ]


    /**
    * @name add
    * @description Insert new Department to the list of available options.
    * @param {any} toAdd value to be added, must be unique
    * @returns 
    */
    add (toAdd) {
        // rather than doing an IF EXISTS on each of these, can I ensure the db col is unique?
        // okay well apparently there is a UNIQUE keyword one can use...
        const query = `
        INSERT INTO department
        SET name = ?
        ;
        `;

        return this.connection.promise().query(query, toAdd);
    };

};


// export functions
// **MUST** instantiate a new instance of the class on export... this will prevent the need to do this at **every** point in the program that the Class is needed.
module.exports = new Department(connection);
