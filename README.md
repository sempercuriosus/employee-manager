# Note Taker App

The purpose of this application is to manage employees

## Table of Contents

- [About The Project and Features](#about-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites And Dependencies](#prerequisites-and-dependencies)
  - [Installation](#installation)
- [Deployment Location](#deployment-location)
- [Challenges](#challenges)
- [Acknowledgments](#acknowledgments)
- [Author Credit](#author-credit)
- [Final Note](#final-note)

===

## About The Project and Features<a id="about-project"></a>

- The application allows you to
- Manage Departments
  - View
  - Add
- Manage Roles
  - View
  - Add
- Manage Employees
  - View
  - Add
  - Update Role

### Built With<a id="#built-with"></a>

- Javascript
  - Node.js
- SQL

---

## Getting Started<a id="getting-started"></a>

- I left a lot of comments in my code for the same reason -- to inform those reading this later on.

### Prerequisites And Dependencies<a id="prerequisites-and-dependencies"></a>

- `asciiart-logo` version `^0.2.7`
- `express` version `^4.18.2`
- `inquirer` version `^8.2.4`
- `mysql2` version `^3.6.1`

### Installation<a id="#installation"></a>

- `npm i` or `npm install` can be used to get the dependencies

### Testing

- No tests in this application

### Running The App

- This is a `CLI` based application and can be run with any terminal

---

## Deployment Location<a id="deployment-location"></a>

- Example Video as this is not deployed
- [Video](https://drive.google.com/file/d/1vCrxD4TktbVRWbQbn3rI2mwXlop1MChj/view)

---

## Challenges<a id="challenges"></a>

- I saw what the issue was on my Department class. the module.exports needed to export a `new` instance of the class to prevent the need for instantiation of a class on each use later on.
- remember your directory structure...
  - `find . -type d \( -name .git -o -name node_modules \) -prune -o -type f -print` was given from chatGPT to list my files excluding the ones I did not want
  - this helped me see my issue in the connection.js file when I was trying to access a file not realizing when I made the dir structure it was out of place.

---

## Acknowledgments<a id="acknowledgments"></a>

- The schema was set by the requirements and is going to be the same
- The connection js file was basically the same since I could not see another way to do that even from the documentation
  - I ended up wanting to use a connection pool, so this is not as relevant now.

## Resources Used

- [MySql2 Documentation](https://www.npmjs.com/package/mysql2)
- [ASCII Art](https://www.npmjs.com/package/asciiart-logo)
- The `init` function declarations are hoisted, which means that they are moved to the top of their containing scope during the creation phase of the JavaScript execution context. However, functions defined using the newer `const` or `let` declarations are not hoisted.
  - What this means is when INIT is used, you can call the function before it is declared. Normally, the function and contents are declared and then used. With `init` the special thing about that is that one can call it before it is declared in the code.
- [Fonts](https://github.com/tomi-vanek/asciiart-logo/blob/HEAD/gallery.txt)
- With a `mysql2` connection pool `.on()` is used to add event listeners to your Node.js application, similar to how you might add event listeners to DOM elements in a web page.
  - `release`: used when a connection is released back to the pool, allowing you to perform some custom logic when a connection is no longer in use.
  - `acquire`: used when a connection is acquired from the pool. You can use it for custom logic when a new connection is acquired.
  - `close`: used when a connection is explicitly closed using the destroy() method. It allows you to perform custom logic when a connection is closed.
  - `error`: used when an error occurs within the connection pool. You can listen for this event to handle errors that occur during database operations

---

## Author Credit<a id="author-credit"></a>

- Eric Hulse [semper curiosus](https://github.com/sempercuriosus)

---

## Final Note<a id="final-note"></a>

- This was a lot of fun to do. I think that promises are starting to click and I was more able to get them returning what I wanted.
- This was neat delegating the actions to the CLI such that each time the query would have to be run.

---

===

