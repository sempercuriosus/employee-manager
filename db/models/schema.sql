
/*
  * Not blindly droping the db that is irresponsible to do. I see why it is being done here, which, to avoid conflicts and issues when running the schema many times.
  * 
  * UNSIGNED - ensures the INT is not negative
  * 
  * UNIQUE - rather than doing an IF EXISTS on all insert queries, adding this 
  * 
  * 
  * 
  * 
*/

-- Create DB
--
-- Check if the database 'employees' exists
SELECT SCHEMA_NAME 
FROM INFORMATION_SCHEMA.SCHEMATA 
WHERE SCHEMA_NAME = 'employees';

-- If the database does not exist, create it
CREATE DATABASE IF NOT EXISTS employees;


-- Switch DB
--
USE employees;


-- CREATE Table 
--    Department
--
CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
    , name VARCHAR(30) UNIQUE NOT NULL
);

-- CREATE Table 
--   Role
--
CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
    , title VARCHAR(30) UNIQUE NOT NULL
    , salary decimal NOT NULL
    , department_id INT UNSIGNED NOT NULL
    , CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);


-- CREATE Table 
--   Employee
--
CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
    , first_name VARCHAR(30) NOT NULL
    , last_name VARCHAR(30) NOT NULL
    , role_id INT UNSIGNED NOT NULL
    , INDEX role_ind (role_id)
    , CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
    , manager_id INT UNSIGNED -- can be null if there is no manager
    , CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);


