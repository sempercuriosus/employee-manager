// establish connection
const connection = require("../connection");


/**
 * @name 
 * @classdesc 
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
    * @name view
    * @returns a Promise Object containing ALL current items
   */
    view () {
        // the point is to return a Promise object, from which, data can be extrapolated, but here we return a Promise back to the index.js for manipulation.
        const query = `
        SELECT id 
            , title
            , department_id
            , salary
        FROM role
        ORDER BY id
        ;
        `;

        return this.connection.promise().query(query);
    }; //  [ end : view ]


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
