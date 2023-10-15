// establish connection
const connection = require("../connection");


/**
 * @name Role
 * @classdesc contains a constructor and several functions related to the Role
 * 
 * One can: 
 * - View Roles
 * - Update Roles
 * - Add Roles
 */
class Role {
    /**
    * Property List for Role Class
    * @property {} connection is the connection established with the target database.
    */
    constructor (connection) {
        this.connection = connection;
    };

    // Function List in Role Class
    //

    /**
    * @name view Lists all of the Roles found in the database
    * @returns a Promise Object containing ALL current items
   */
    view () {
        // the point is to return a Promise object, from which, data can be extrapolated, but here we return a Promise back to the index.js for manipulation.
        const query = `
        SELECT id AS 'Role_ID'
            , title AS 'Role_Name'
            , department_id AS 'Department_ID'
            , salary AS 'Role_Salary'
        FROM role
        ORDER BY id
        ;
        `;

        return this.connection.promise().query(query);
    }; //  [ end : view ]


    /**
    * @name add
    * @description Insert new Role to the list of available options.
    * @param {} name value to be added, must be unique
    * @param {} salary the amount of money this Role is to be paid
    * @param {} department_id the department to which the Role will belong
    * @returns 
    */
    add (name, salary, department_id) {
        const query = `
        INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?);
        `;

        return this.connection.promise().query(query, [ name, salary, department_id ]);
    }

};

// export functions
// **MUST** instantiate a new instance of the class on export... this will prevent the need to do this at **every** point in the program that the Class is needed.
module.exports = new Role(connection);
