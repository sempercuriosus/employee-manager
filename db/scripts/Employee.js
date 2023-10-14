// establish connection
const connection = require("../connection");


/**
 * @name 
 * @classdesc 
 */
class Employee {
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
        SELECT emp.id 
            , emp.first_name as 'FirstName'
            , emp.last_name as 'LastName'
            , d.name as 'Department'
            , r.title as 'Role'
            , r.salary as 'Salary'
        FROM employee emp 
        INNER JOIN role r ON r.id = emp.role_id
        INNER JOIN department d ON d.id = r.department_id
        ORDER BY emp.last_name, emp.first_name
        ;
        `;

        return this.connection.promise().query(query);
    }; //  [ end : view ]

    /**
     * @name view
     * @returns a Promise Object containing ALL current items
     */
    listManagers () {
        // the point is to return a Promise object, from which, data can be extrapolated, but here we return a Promise back to the index.js for manipulation.
        const query = `
        SELECT emp.id 
            , emp.first_name as 'FirstName'
            , emp.last_name as 'LastName'
            , r.title as 'Role'
        FROM employee emp 
        INNER JOIN role r ON r.id = emp.role_id
        ORDER BY emp.last_name, emp.first_name
        ;
        `;

        return this.connection.promise().query(query);
    }; //  [ end : view ]

    add (first_name, last_name, role_id, manager_id) {
        // first name, last name, role, and manager
        const query = `
        INSERT INTO EMPLOYEE(first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)
        ;
        `;

        return this.connection.promise().query(query, [ first_name, last_name, role_id, manager_id ]);
    }

};

// export functions
// **MUST** instantiate a new instance of the class on export... this will prevent the need to do this at **every** point in the program that the Class is needed.
module.exports = new Employee(connection);
