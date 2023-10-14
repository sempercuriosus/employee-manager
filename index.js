
// add inquirer
const inq = require("inquirer");

// logo details
const logo = require("asciiart-logo");
const logoText = "The Office Manager";
const logoDescription = "Manage your office personel from the command line, simply.";

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
    console.info("[ displayLogo ] : called");
    const renderedLogo = logo({ name: logoText, description: logoDescription, font: "Soft", borderColor: "bold-black", logoColor: "blue", textColor: "white" }).render();
    console.log(renderedLogo);
}; //  [ end : displayLogo ]


/**
 * Starts the application, displying the menu options to the user such that they can complete the actions
 * @name mainMenu
*/
function mainMenu () {
    console.info("[ mainMenu ] : called");
    inq.prompt([
        {
            type: "list"
            , name: "menuSelection"
            , message: "MENU - select from the following options"
            , choices: [
                {
                    name: "View ALL Departments"
                    , value: ""
                }
                , {
                    name: "View ALL Roles"
                    , value: ""
                }, {
                    name: "View ALL Employees"
                    , value: ""
                }, {
                    name: "ADD Department"
                    , value: ""
                }, {
                    name: "ADD Role"
                    , value: ""
                }, {
                    name: "ADD Employee"
                    , value: ""
                }, {
                    name: "UPDATE Employee Role"
                    , value: ""
                }
            ]
        }
    ]);
}; //  [ end : mainMenu ]
