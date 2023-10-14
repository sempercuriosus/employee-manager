
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
 * @param {string} logoText is the text that you want to generate.
*/
function displayLogo (logoText) {
    const renderedLogo = logo({ name: logoText, description: logoDescription, font: "Soft", borderColor: "bold-black", logoColor: "blue", textColor: "white" }).render();
    console.log(renderedLogo);
}; //  [ end : displayLogo ]


/**
 * Starts the application, displying the menu options to the user such that they can complete the actions
 * @name mainMenu
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
                        name: "ADD - Department"
                        , value: "create_department"
                    }
                    , {
                        name: "ADD - Role"
                        , value: "create_role"
                    }
                    , {
                        name: "ADD - Employee"
                        , value: "create_employee"
                    }
                    , {
                        name: "UPDATE Employee Role"
                        , value: "update_employee_role"
                    }
                    // , {
                    //     name: "DELETE -  Department"
                    //     , value: "delete_department"
                    // }
                    // , {
                    //     name: "DELETE - Role"
                    //     , value: "delete_role"
                    // }, {
                    //     name: "DELETE - Employee"
                    //     , value: "delete_employee"
                    // }
                    , {
                        name: "EXIT - Program"
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
//
/*
 * This is a listing of the functions that are used in the application, breaking them out of the inquirer prompt flow
*/

// #region Departments
//
/*
 * Department Specific Functions
*/




/**
 * @name viewDepartments 
 * @returns Department Table Values
*/
function viewDepartments () {
    Department.view()
        .then(([ resData ]) => {
            let departments = resData;
            console.log("");
            console.log("DEPARTMENTS");
            console.table(departments);
        })
        .then(() => loadMainMenu());

}; //  [ end : viewDepartment ]

/**
 * @name addDepartment
 * @description Asks for the new Department's name, attempts to update the database, and the loads the new changes
*/
function addDepartment () {
    inq
        // ask new department
        .prompt([
            {
                name: "name"
                , message: "Provide the new Department name: "
            }
        ])
        // insert
        .then(departmentName => {
            let name = departmentName.name;
            console.log(name);
            Department.add(name)
                // confirmation message
                .then(() => console.info("Added the Department:  " + name))
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
 * @param {} 
 * @returns Role Table Values
*/
function viewRoles () {
    Role.view()
        .then(([ resData ]) => {
            let roles = resData;
            console.log("");
            console.log("ROLES");
            console.table(roles);
        })
        .then(() => loadMainMenu());

}; //  [ end : viewRoles ]



/**
 * @name addRole
 * @description Asks for the new Role's name, attempts to update the database, and the loads the new changes
*/
function addRole () {
    Department.view()
        .then((resData) => {
            // this is here instead of destructuring, just to remind me this is a thing too.
            let departments = resData[ 0 ];
            console.log(departments);
            // get a map of the existing departments to select from
            const list = departments.map(({ id, name }) => ({
                name: name
                , value: id
            }));
            inq
                // ask role name
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
                    , choices: list
                }
                ])
                .then(roleData => {
                    let { name, salary, department } = roleData;

                    Role.add(name, salary, department)
                        .then(() => {
                            console.info("Added the Role: " + name);
                            console.info("With the Salary: " + salary);
                            console.info("To the Department: " + department);
                        })
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
 * @description Shows a formatted table view of the current Employees
*/
function viewEmployees () {
    Employee.view()
        // destructure the results
        .then(([ resData ]) => {

            const employees = resData;
            console.log("");
            console.log("EMPLOYEES");
            console.table(employees);
        })
        .then(() => loadMainMenu());

}; //  [ end : viewEmployees ]


/**
 * @name addEmployee
 * @description Asks for the Employee's information
 * First Name, 
 * Last Name, 
 * Role, 
 * and Manager
 * then attempts to update the Database, 
 * and confirms the Employee was added.
*/
function addEmployee () {
    // get the new information on the employee
    // first and last name
    inq
        .prompt([ {
            "name": "first"
            , "message": "Provide the Employee's First Name"
        },
        {
            "name": "last"
            , "message": "Provide the Employee's Last Name"
        }
        ])
        .then(resData => {
            const firstName = resData.first;
            const lastName = resData.last;

            // role of employee
            // get the list of roles
            Role.view()
                .then(([ resData ]) => {
                    let roles = resData;
                    const roleList = roles.map(({ id, title }) => ({
                        "name": title
                        , "value": id
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
                                    const managerList = employees.map(({ id, FirstName, LastName, Role }) => ({
                                        "name": FirstName + " " + LastName + " - " + Role
                                        , "value": id
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
                                        // destructure the employee information and get ready to update the db with it
                                        .then((resData) => {
                                            const managerID = resData.manager;

                                            Employee.add(firstName, lastName, roleId, managerID);
                                        })
                                        .then(() => {
                                            console.info("Added " + firstName + " " + lastName + " as an Employee");
                                            console.log("");
                                        })
                                        .then(() => loadMainMenu());

                                    // Employee.add();
                                });// employee list end
                        });
                });// role end
        });
}; //  [ end : addEmployee ]


//
// #endregion Employee



// Exit Application
function exit () {
    console.log("Employees, Managed.");
    process.exit();
}

//
// #endregion Complete Action List
