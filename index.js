const inquirer = require("inquirer");
const connection = require("./config/connection");
const { listAllDepartments, listAllOccupations, listAllEmployees } = require("./lib/queries");
const { displayData } = require("./lib/displays");

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
        "List All Roles",
        "List All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role"
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


      // add a role


      // add an employee


      // update an employee's role

      

      default:
        start();
    }
  })
}

start();