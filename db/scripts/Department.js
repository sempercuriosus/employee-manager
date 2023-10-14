
// establish connection
const connection = require("./db/connection");

/**
 * @name 
 * @classdesc 
 */
class Department {
    /**
    * Property List for Department Class
    * @property {} 
    * @property {} 
    */
    constructor () {
        this.connection = connection.createConnection();
    };

    // Function List in Department Class
    //

    /**
     * @name viewDepartments
     * @param {}  - 
     * @returns a Promise Object containing ALL current departments
    */
    viewDepartments () {
        console.info("[ viewDepartments ] : called");

        // the point is to return a Promise object, from which, data can be extrapolated, but here we return a Promise back to the index.js for manipulation.
        const query = "SELECT * FROM departments";
        return this.connection.promise().query(query);

    }; //  [ end : viewDepartments ]


    /**
     * @name 
     */
    viewRoles () {

    };
};


// export functions
module.exports = Department;