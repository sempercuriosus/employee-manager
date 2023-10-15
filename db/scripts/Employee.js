// establish connection
const connection = require("../connection");


/**
 * @name Employee
 * @classdesc contains a constructor and several functions related to the Employee
 * 
 * One can: 
 * - View Employees
 * - Update Employees
 * - Add Employees
 */
class Employee {
    /**
    * Property List for Employee Class
    * @property {} connection is the connection established with the target database.
    */
    constructor (connection) {
        this.connection = connection;
    };

    // Function List in Employee Class
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

    /**
     * @name add
     * @description Insert new Employee to the list of current Employees.
     * @param {} first_name Name of the Employee to be added
     * @param {} last_name Name of the Employee to be added
     * @param {} role_id Role the Employee has
     * @param {} manager_id Employee reports to this person, may be null
     * @returns 
    */
    add (first_name, last_name, role_id, manager_id) {
        const query = `
        INSERT INTO employee(first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)
        ;
        `;

        return this.connection.promise().query(query, [ first_name, last_name, role_id, manager_id ]);
    }

    /**
      * @name add
      * @description Insert new Employee to the list of current Employees.
      * @param {} employee_id Employee to be updated
      * @param {} role_id NEW Role the Employee has
      * @returns 
    */
    updateRole (employee_id, role_id) {
        const query = `
            UPDATE employee
            SET role_id = ?
            WHERE id = ?
        `;

        return this.connection.promise().query(query, [ role_id, employee_id ]);
    }


};

// export functions
// **MUST** instantiate a new instance of the class on export... this will prevent the need to do this at **every** point in the program that the Class is needed.
module.exports = new Employee(connection);
