
// establish connection
const connection = require("../connection");

/**
 * @name Department
 * @classdesc contains a constructor and several functions related to the Department
 * 
 * One can View, Update, Add new departments
 */
class Department {
    /**
    * Property List for Department Class
    * @property {} connection is the connection established with the target database.
    * @property {} 
    */
    constructor () {
        this.connection = connection;
    };

    // Function List in Department Class
    //

    /**
     * @name view
     * @returns a Promise Object containing ALL current departments
    */
    view () {
        console.info("[ view ] : called");

        // the point is to return a Promise object, from which, data can be extrapolated, but here we return a Promise back to the index.js for manipulation.
        const query = `
        SELECT id 
            , name
        FROM department
        ;
        `;
        return this.connection.promise().query(query);

    }; //  [ end : view ]


    /**
    * @name add
    * @classdesc Adds a new Department to the list of available options
    * @param name
    * @returns 
    */
    add (name) {
        // rather than doing an IF EXISTS on each of these, can I ensure the db col is unique?
        // okay well apparently there is a UNIQUE keyword one can use...
        const query = `
        INSERT INTO department
        
        ;
        `;
        return this.connection.promise().query(query);
    };

};


// export functions
// **MUST** instantiate a new instance of the class on export... this will prevent the need to do this at **every** point in the program that Department is needed.
module.exports = new Department(connection);
