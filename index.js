const inquirer = require("inquirer");
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
    switch(response.option){

      // view all departments
      case "List All Departments":
        listAllDepartments().then( ([rows]) => {
          displayData(rows);
          start();
        });
        break;

      // view all roles/occupations
      case "List All Roles":
        listAllOccupations().then( ([rows]) => {
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
        addDepartment().then(() => {
        start();
        });

      // add a role
      case "Add Role (occupation":
        // addOccupation(title, salary, department_id)
        addOccupation().then(() => {
        start();
        });

      // add an employee
      case "Add Employee":
        // addEmployee(firstName, lastName, occupation_id, department_id)
        addEmployee().then(() => {
        start();
        });

      // update an employee's role
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

start();