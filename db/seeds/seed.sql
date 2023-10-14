use employees;

-- Sample list of departments
INSERT INTO department (name) 
VALUES
    ('Management') -- Assuming Value: 1 
    , ('Sales') -- Assuming Value: 2
    , ('Accounting') -- Assuming Value: 3
    , ('Human Resources') -- Assuming Value: 4
    , ('Customer Service') -- Assuming Value: 5
    , ('Quality Assurance') -- Assuming Value: 6
    , ('Supplier Relations') -- Assuming Value: 7
    , ('Reception') -- Assuming Value: 8
    , ('Warehouse') -- Assuming Value: 9
    , ('IT') -- Assuming Value: 10
    ;

-- Sample list of roles
INSERT INTO role (title, salary, department_id) 
VALUES
    -- Management
    ('Regional Manager', 100000, 1) -- Assuming Value: 1
    , ('Asst. To The Regional Manager', 80000, 1) -- Assuming Value: 2
    -- Sales 
    , ('Sales Rep', 60000, 2) -- Assuming Value: 3
    -- Accounting 
    , ('Accountant', 65000, 3) -- Assuming Value: 4
    -- Human Resources 
    , ('HR Manager', 75000, 4) -- Assuming Value: 5
    -- Customer Service 
    , ('Customer Service Rep', 55000, 5) -- Assuming Value: 6
    -- QA 
    , ('QA Specialist', 65000, 6) -- Assuming Value: 7
    -- Supplier Relations
    , ('SR Specialist', 65000, 7) -- Assuming Value: 8
    -- ('Reception')
    , ('Receptionist', 45000, 8) -- Assuming Value: 9
    -- Warehouse 
    , ('Warehouse Supervisor', 80000, 9) -- Assuming Value: 10
    , ('Warehouse', 80000, 9) -- Assuming Value: 11
    -- IT 
    , ('IT Manager', 80000, 10) -- Assuming Value: 12
    ;  
    
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
-- Management
    -- Michael Scott is the Regional Manager
    ('Michael', 'Scott', 1, NULL)
    -- Dwight Schrute is the Assistant To The Regional Manager
    , ('Dwight', 'Schrute', 2, 1)
-- Sales
    -- Jim Halpert is a Sales Representative 
    , ('Jim', 'Halpert', 3, 1)
    -- Pam Beesly is a Sales Representative 
    , ('Pam', 'Beesly', 3, 1)
    -- Ryan Howard is a Sales Representative 
    , ('Ryan', 'Howard', 3, 1)
    -- Stanley Hudson is a Sales Representative 
    , ('Stanley', 'Hudson', 3, 1)
    -- Andy Bernard is a Sales Representative 
    , ('Andy', 'Bernard', 3, 1)
    -- Phyllis Vance is a Sales Representative 
    , ('Phyllis', 'Vance', 3, 1)
-- Accounting
    -- Angela Martin is an Accountant
    , ('Angela', 'Martin', 4, 1)
    -- Kevin Malone is an Accountant
    , ('Kevin', 'Malone', 4, 1)
    -- Oscar Martinez is an Accountant
    , ('Oscar', 'Martinez', 4, 1)
-- Human Resources
    -- Toby Flenderson is in HR
    , ('Toby', 'Flenderson', 5, NULL)
    -- Holly Flax is in HR
    , ('Holly', 'Flax', 5, NULL)
-- Customer Service
    -- Kelly Kapoor is in Customer Service
    , ('Kelly', 'Kapoor', 6, 1)
-- Quality Assurance
    -- Creed Bratton is the Quality Assurance Specialist
    , ('Creed', 'Bratton', 7, NULL)
-- Supplier Relations
    -- Meredith Palmer is in Supplier Relations
    , ('Meredith', 'Palmer', 8, NULL)
-- Reception
    -- Erin Hannon is a Sales Representative
    , ('Erin', 'Hannon', 9, 1)
-- Warehouse
    -- Darryl Philbin is a Warehouse Supervisor
    , ('Darryl', 'Philbin', 10, NULL)
    , ('Roy', 'Anderson', 11, 18) 
    , ('Madge', 'Madsen', 11, 18) 
    , ('Lonny', 'Collins', 11, 18)
-- IT
    , ('Eric', 'Hulse', 12, NULL)

    ;