const inquirer = require("inquirer");
const outputCyanText = (text) => console.log(`\x1b[36m${text}\x1b[0m`);
const connection = require("./config/connection");
const { displayData } = require("./lib/displays");
const { listAllDepartments, 
        listAllOccupations,
        listAllEmployees,
        addDepartment,
        addOccupation,
        updateEmployeeOccupation,
        addEmployee
      } = require("./lib/queries");

/*
  There are a lot of menu items presented to users in this app. The only real way you cam manage them 
  is by creating a function to handle each one.

  I'm giving you a bit of starter code below.
*/ 

function start(){
  inquirer.prompt([
    {   
      type: "list",
      message: "Choose an item from the list below:",
      name: "option", 
      choices: [
        "List All Departments",
        "List All Roles (occupations)",
        "List All Employees",
        "Add Department",
        "Add Role (occupation)",
        "Add Employee",
        "Update Employee Role (occupation)"
      ]
    },
  ])
  .then( response => {
    switch( response.option ){

      // view all departments
      case "List All Departments":
        listAllDepartments().then(([rows]) => {
          displayData(rows);
          start();
        });
        break;

      // view all roles/occupations
      case "List All Roles (occupations)":
        listAllOccupations().then(([rows]) => {
          displayData(rows);
          start();
        });
        break;

      // view all employees
      case "List All Employees":
        listAllEmployees().then(([rows]) => {
          displayData(rows);
          start();
        });
        break;

      // add a department
      case "Add Department":
        // addDepartment(newDepartment)
        promptForDepartmentDetails();
        break;

      // add a role (occupation)
      case "Add Role (occupation)":
        // Prompt the user for occupation details
        promptForOccupationDetails();
        break;

      // add an employee
      case "Add Employee":
        // addEmployee(firstName, lastName, occupation_id, department_id)
        promptForEmployeeDetails();
        break;

      // update an employee's role (occupation)
      case "Update Employee Role (occupation)":
        // updateEmployeeOccutation(employeeId, occupationId)
        updateEmployeeOccupation().then(() => {
        start();
        });


      default:
        start();
    }
  })
}

// get input details for adding new department
function promptForDepartmentDetails() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter name of department to add:',
      name: 'departmentName'
    }
  ]).then(async (userInput) => {
    const { departmentName } = userInput;

    try {
      await addDepartment(departmentName);
      outputCyanText(`\nNew department "${departmentName}" added to the database successfully!\n`);
      start();
    } catch (error) {
      console.error(error);
      start();
    }
  });
}

// get input details for adding new role (occupation)
function promptForOccupationDetails() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter title of role (occupation) to add:',
      name: 'occupationTitle'
    },
    {
      type: 'input',
      message: 'Enter salary:',
      name: 'salary'
    },
    {
      type: 'input',
      message: 'Enter ID # of department being added:',
      name: 'departmentId'
    }
  ]).then(async (userInput) => {
    const { occupationTitle, salary, departmentId } = userInput;

    try {
      await addOccupation(occupationTitle, salary, departmentId);
      outputCyanText(`\nNew role "${occupationTitle}" data added to the database successfully!\n`);
      start();
    } catch (error) {
      console.error(error);
      start();
    }
  });
}

// get input details for adding new employee
function promptForEmployeeDetails() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter first name of employee to add:',
      name: 'employeeFirstName'
    },
    {
      type: 'input',
      message: 'Enter last name of employee to add:',
      name: 'employeeLastName'
    },
    {
      type: 'input',
      message: 'Enter the ID# of the role (occupation) of new employee:',
      name: 'departmentId'
    },
    {
      type: 'input',
      message: "Enter the ID # of new employee's manager:",
      name: 'managerId'
    },
  ]).then(async (userInput) => {
    const { employeeFirstName, employeeLastName, occupationId,  departmentId } = userInput;

    try {
      // function addEmployee(firstName, lastName, occupation_id, department_id)
      await addEmployee(employeeFirstName, employeeLastName, occupationId, departmentId);
      outputCyanText(`\nNew employee "${employeeFirstName} ${employeeLastName}" data added to the database successfully!\n`);
      start();
    } catch (error) {
      console.error(error);
      start();
    }
  });
}

// TO-DO:
// *  get input details for updating an employee's role (occupation)
function promptForUpdatingEmployeeOccupation() {

}

start();