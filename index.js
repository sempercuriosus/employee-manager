
// add inquirer
const inq = require("inquirer");

// logo details
const logo = require("asciiart-logo");
const logoText = "The Office Manager";
const logoDescription = "Manage your office personel from the command line, simply.";

// db query
const Department = require("./db/scripts/Department");

init();

/**
 * INITIALIZE THE APPLICATION 
 * @name init
*/
function init () {
    displayLogo(logoText);
    mainMenu();

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
function mainMenu () {
    inq.prompt([
        {
            type: "list"
            , name: "menuSelection"
            , message: "MENU - select from the following options"
            , choices: [
                {
                    name: "View ALL Departments"
                    , value: "view_departments"
                }
                , {
                    name: "View ALL Roles"
                    , value: "view_roles"
                }
                , {
                    name: "View ALL Employees"
                    , value: "view_employees"
                }
                , {
                    name: "ADD Department"
                    , value: "create_department"
                }
                , {
                    name: "ADD Role"
                    , value: "create_role"
                }
                , {
                    name: "ADD Employee"
                    , value: "create_employee"
                }
                , {
                    name: "UPDATE Employee Role"
                    , value: "update_employee_role"
                }
            ]
        }
    ]).then(res => {
        // Takes the user-selected value and translates this into an action
        const selectedOption = res.menuSelection;

        if (selectedOption === "view_departments") {
            console.info("Getting the Departments...");
            Department.view()
                .then(([ resData ]) => {
                    let departments = resData;
                    console.log("");
                    console.log("Department List");
                    console.table(departments);
                });
        }
        else if (selectedOption === "view_roles") {

        }
        else if (selectedOption === "create_department") {

        }
        else if (selectedOption === "create_role") {

        }
        else if (selectedOption === "create_employee") {

        }

        else if (selectedOption === "update_employee_role") {

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


