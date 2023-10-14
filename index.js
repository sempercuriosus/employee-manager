const logo = require("asciiart-logo");
const logoText = "Office Management Software";
const logoDescription = "Manage your employees from the command line, simply.";


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


displayLogo(logoText);