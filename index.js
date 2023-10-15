
// add inquirer
const inq = require("inquirer");

// logo details
const logo = require("asciiart-logo");
const logoText = "The Office Manager";
const logoDescription = "Manage your office personel from the command line, simply.";

// db query
const Department = require("./db/scripts/Department");
const Role = require("./db/scripts/Role");
const Employee = require("./db/scripts/Employee");

init();

/**
 * INITIALIZE THE APPLICATION 
 * @name init
*/
function init () {
    displayLogo(logoText);
    loadMainMenu();

}; //  [ end : init ]


/**
 * Renders the logo
 * @name displayLogo
*/
function displayLogo (logoText) {
    const renderedLogo = logo({ name: logoText, description: logoDescription, font: "Soft", borderColor: "bold-black", logoColor: "blue", textColor: "white" }).render();
    console.log(renderedLogo);
}; //  [ end : displayLogo ]


/**
 * Starts the application, displying the menu options to the user such that they can complete the actions
 * @name loadMainMenu
 * 
 * Current Options
 * EMPLOYEE
 * - View
 * - Add
 * - Update Role
 * 
 * ROLE
 * - View
 * - Add
 * 
 * DEPARTMENT
 * - View
 * - Add
 * 
 * Exit
*/
function loadMainMenu () {
    inq
        .prompt([
            {
                type: "list"
                , name: "menuSelection"
                , message: "MENU - select from the following options"
                , choices: [
                    {
                        name: "VIEW - Employees"
                        , value: "view_employees"
                    }
                    , {
                        name: "VIEW - Roles"
                        , value: "view_roles"
                    }
                    , {
                        name: "VIEW - Departments"
                        , value: "view_departments"
                    }
                    , {
                        name: "ADD - Employee"
                        , value: "create_employee"
                    }
                    , {
                        name: "ADD - Role"
                        , value: "create_role"
                    }
                    , {
                        name: "ADD - Department"
                        , value: "create_department"
                    }
                    , {
                        name: "UPDATE -  Employee Role"
                        , value: "update_employee_role"
                    }
                    // , {
                    //     name: "DELETE - Employee"
                    //     , value: "delete_employee"
                    // }
                    // , {
                    //     name: "DELETE - Role"
                    //     , value: "delete_role"
                    // }
                    // , {
                    //     name: "DELETE -  Department"
                    //     , value: "delete_department"
                    // }
                    , {
                        name: "** EXIT Program **"
                        , value: "exit"
                    }
                ]
            }
        ])
        .then(res => {
            // Takes the user-selected value and translates this into an action
            const selectedOption = res.menuSelection;

            if (selectedOption === "view_employees") {
                viewEmployees();
            }
            else if (selectedOption === "view_roles") {
                viewRoles();
            }
            else if (selectedOption === "view_departments") {
                viewDepartments();
            }
            else if (selectedOption === "create_employee") {
                addEmployee();
            }
            else if (selectedOption === "create_department") {
                addDepartment();
            }
            else if (selectedOption === "create_role") {
                addRole();
            }
            else if (selectedOption === "update_employee_role") {
                updateRole();
            }
            else if (selectedOption === "exit") {
                exit();
            }
            else {
                // accounting for the option not being found with this.
                console.error("The option selected does not have an action.");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}; //  [ end : mainMenu ]



// #region Complete Action List





// #region Departments
//
/*
 * Department Specific Functions
*/



/**
 * @name viewDepartments 
 * @description Shows the current list of Departments
*/
function viewDepartments () {
    // getting the list of depts
    Department.view()
        .then(([ resData ]) => {
            let departments = resData;
            console.log("");
            // table showing result-set
            console.table(departments);
        })
        // return to menu
        .then(() => loadMainMenu());
}; //  [ end : viewDepartment ]



/**
 * @name addDepartment
 * @description Adds a new Department to the database
 * 
 * Asks for:
 * - Department Name
*/
function addDepartment () {
    inq
        // ask new department name
        .prompt([
            {
                name: "name"
                , message: "Provide the new Department name: "
            }
        ])
        // getting the new name to use 
        .then(resData => {
            let departmentName = resData.name;

            // Adding to the db
            Department.add(departmentName)
                // confirmation message
                .then(() => console.log("Added the Department:  " + departmentName), "")
                // load menu
                .then(() => loadMainMenu());
        })
        // log error
        .catch((error) => {
            console.error("There was an error in adding the new Department", "");
            console.error(error);
        });
}; //  [ end : addDepartment ]



//
// #endregion Departments






// #region Roles
//
/*
 * Role Specific Functions 
*/



/**
 * @name viewRoles
 * @description Shows the current list of Roles
*/
function viewRoles () {
    // getting the list of depts
    Role.view()
        .then(([ resData ]) => {
            let roles = resData;
            console.log("");
            // table showing result-set
            console.table(roles);
        })
        // return to menu
        .then(() => loadMainMenu());

}; //  [ end : viewRoles ]



/**
 * @name addRole
 * @description Adds a new Role to the database
 * 
 * Asks for:
 * - Role Name
 * - Salary
 * - Department Name
*/
function addRole () {
    Department.view()
        .then((resData) => {
            // this is here instead of destructuring, just to remind me this is a thing too.
            let departments = resData[ 0 ];

            // mapping the departments for selection
            // map fn values from result-set alias names
            const departmentList = departments.map(({ Department_ID, Department_Name }) => ({
                name: Department_Name
                , value: Department_ID
            }));
            inq
                // ask role name, salary, department
                .prompt([ {
                    name: "name"
                    , message: "Provide the new Role Name: "
                }
                    , {
                    name: "salary"
                    , message: "Provide the new Role's Salary: "
                }
                    , {
                    name: "department"
                    , type: "list"
                    , message: "Provide the new Role's Department"
                    , choices: departmentList
                }
                ])
                // passing along inq values
                .then(roleData => {
                    let { name, salary, department } = roleData;

                    // insert to db
                    Role.add(name, salary, department)
                        .then(() => {
                            console.log("Added the Role: " + name);
                            console.log("With the Salary: " + salary);
                            console.log("To the Department: " + department);
                        })
                        // return to menu
                        .then(() => loadMainMenu());
                });
        });

}; //  [ end : addRole ]



//
// #endregion Roles






// #region Employee
//
/*
 * 
 * Employee Related Functions
 * 
*/



/**
 * @name viewEmployees
 * @description Shows the current list of Employees
*/
function viewEmployees () {
    Employee.view()
        // getting list of emp
        .then(([ resData ]) => {
            const employees = resData;
            console.log("");
            // table showing result-set
            console.table(employees);
        })
        // return to menu
        .then(() => loadMainMenu());

}; //  [ end : viewEmployees ]



/**
 * @name addEmployee
 * @description Adds a new Employee 
 * 
 * Asks for:
 * - First Name
 * - Last Name 
 * - Role
 * - Manager
 * 
 * The Employee is then added in the Database
 * with a confirmation that the Employee was added.
*/
function addEmployee () {
    // get the new information on the employee
    // first and last name
    inq
        .prompt([ {
            "name": "first_name"
            , "message": "Provide the Employee's First Name: "
        },
        {
            "name": "last_name"
            , "message": "Provide the Employee's Last Name: "
        }
        ])
        .then(resData => {
            // saving first and last for insert
            const firstName = resData.first_name;
            const lastName = resData.last_name;

            // get the list of roles
            Role.view()
                .then(([ resData ]) => {
                    let roles = resData;
                    // map fn values from result-set alias names
                    const roleList = roles.map(({ Role_ID, Role_Name }) => ({
                        "name": Role_Name
                        , "value": Role_ID
                    }));
                    // set the role for the new employee
                    inq
                        .prompt({
                            "name": "role"
                            , "message": "Provide the Employee's Role"
                            , "type": "list"
                            , "choices": roleList
                        })
                        // add the manager
                        // assuming that anyone can manage any other employee and that some will not require a manager
                        .then((resData) => {
                            const roleId = resData.role;

                            // get managers
                            Employee.listManagers()
                                .then(([ resData ]) => {
                                    let employees = resData;
                                    // map fn values from result-set alias names
                                    const managerList = employees.map(({ Employee_ID, First_Name, Last_Name, Employee_Role }) => ({
                                        "name": First_Name + " " + Last_Name + " - " + Employee_Role
                                        , "value": Employee_ID
                                    }));

                                    // adding a record allowing no one to be selected as the manager
                                    managerList.unshift({ name: "None", value: null });

                                    // set manager for employee
                                    inq
                                        .prompt([
                                            {
                                                "name": "manager"
                                                , "message": "Provide to whom the Employee will report"
                                                , "type": "list"
                                                , "choices": managerList

                                            }
                                        ])
                                        // destructure the employee logrmation and get ready to update the db with it
                                        .then((resData) => {
                                            const managerID = resData.manager;

                                            // insert new emp
                                            Employee.add(firstName, lastName, roleId, managerID);
                                        })
                                        .then(() => {
                                            console.log("Added " + firstName + " " + lastName + " as an Employee");
                                            console.log("");
                                        })
                                        .then(() => loadMainMenu());
                                });// employee list end
                        });
                });// role end
        });
}; //  [ end : addEmployee ]



/**
 * @name updateRole
 * @description updates an Employees current Role
 * - Lists Employees to select from as the update target
 * - Lists Roles for the new role
 * Confirms the update by logging
*/
function updateRole () {
    console.log("[ updateRole ] : called");

    // list employees
    Employee.view()
        .then(([ resData ]) => {

            let employees = resData;
            // map the employees
            // map fn values from result-set alias names
            const employeeList = employees.map(({ Employee_ID, First_Name, Last_Name, Employee_Role }) => ({
                "name": First_Name + " " + Last_Name + " - " + Employee_Role
                , "value": Employee_ID
            }));

            // prompt the list for selection
            inq
                .prompt([ {
                    "name": "employee_id"
                    , "message": "Pick the Employee you wish to update."
                    , "type": "list"
                    , "choices": employeeList
                } ])
                .then((resData) => {
                    let employeeID = resData.employee_id;

                    // list roles
                    Role.view()
                        .then(([ resData ]) => {
                            let roles = resData;

                            // map roles
                            // map fn values from result-set alias names
                            const roleList = roles.map(({ Role_ID, Role_Name }) => ({
                                "name": Role_Name
                                , "value": Role_ID
                            }));

                            // ask for role
                            inq
                                .prompt([ {
                                    "name": "role_id"
                                    , "message": "Select the new Role you are assigning"
                                    , "type": "list"
                                    , "choices": roleList
                                } ])
                                .then((resData) => {
                                    const newRoleID = resData.role_id;

                                    // dp update
                                    Employee.updateRole(employeeID, newRoleID);
                                })
                                .then(() => console.log("You have Updated the Employee's Role.", ""))
                                .then(() => loadMainMenu());
                        });
                });
        });

}; //  [ end : updateRole ]




//
// #endregion Employee






// Exit Application
function exit () {
    console.log("Employees, Managed.");
    process.exit();
}






// #endregion Complete Action List
