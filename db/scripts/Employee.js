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
        SELECT emp.id as 'Employee_ID'
            , emp.first_name as 'First_Name'
            , emp.last_name as 'Last_Name'
            , d.name as 'Department'
            , r.title as 'Employee_Role'
            , r.salary as 'Employee_Salary'
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
        // reason I broke this out : 
        //  because I was considering the addition of a boolean field in the employee table called "isManager"
        //  such that I can filter the list and not return ALL employees. 
        const query = `
        SELECT emp.id as 'Employee_ID'
        , emp.first_name as 'First_Name'
        , emp.last_name as 'Last_Name'
            , r.title as 'Employee_Role'
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
        INSERT INTO employee(first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)
        ;
        `;

        return this.connection.promise().query(query, [ first_name, last_name, role_id, manager_id ]);
    }

    updateRole (employeeId, newRole) {
        const query = `
            UPDATE employee
            SET role_id = ?
            WHERE id = ?
        `;

        return this.connection.promise().query(query, [ newRole, employeeId ]);
    }


};

// export functions
// **MUST** instantiate a new instance of the class on export... this will prevent the need to do this at **every** point in the program that the Class is needed.
module.exports = new Employee(connection);
