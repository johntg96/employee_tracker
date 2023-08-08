const inquirer = require("inquirer");
const outputCyanText = (text) => console.log(`\x1b[36m${text}\x1b[0m`);
const outputRedText = (text) => console.log(`\x1b[31m${text}\x1b[0m`);
const outputOrangeText = (text) => console.log(`\x1b[38;5;208m${text}\x1b[0m`);
const { displayData } = require("./lib/displays");
const { listAllDepartments, 
        listAllOccupations,
        listAllEmployees,
        addDepartment,
        addOccupation,
        updateEmployeeOccupation,
        getEmployeeNames,
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
        "Update Employee Role (occupation)",
        `\x1b[31mExit\x1b[0m` // this changes the text color to red
      ]
    }
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
        // prompt the user for occupation details
        promptForOccupationDetails();
        break;

      // add an employee
      case "Add Employee":
        // prompt the user for employee details
        promptForEmployeeDetails();
        break;

      // update an employee's role (occupation)
      case "Update Employee Role (occupation)":
        // prompt the user for details to update employee occupation
        promptForUpdatingEmployeeOccupation();
        break;

      // exit the script
      case `\x1b[31mExit\x1b[0m`:
        process.exit(0);

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
      outputOrangeText(`\nNew department "${departmentName}" added to the database successfully!\n`);
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
      outputOrangeText(`\nNew role "${occupationTitle}" added to the database successfully!\n`);
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
      message: "Enter the ID# of new employee's manager:",
      name: 'managerId'
    },
    {
      type: 'input',
      message: 'Enter the ID# of the role (occupation) of new employee:',
      name: 'occupationId'
    },
    {
      type: 'input',
      message: "Enter the ID # of new employee's department:",
      name: 'departmentId'
    },
  ]).then(async (userInput) => {
    const { employeeFirstName, employeeLastName, occupationId,  managerId, departmentId } = userInput;

    try {
      // function addEmployee(firstName, lastName, manager_id, occupation_id, department_id)
      await addEmployee(employeeFirstName, employeeLastName, managerId, occupationId, departmentId);
      outputOrangeText(`\nNew employee "${employeeFirstName} ${employeeLastName}" added to the database successfully!\n`);
      start();
    } catch (error) {
      console.error(error);
      start();
    }
  });
}

// get input details for updating an employee's role (occupation)
function promptForUpdatingEmployeeOccupation() {
  getEmployeeNames()
  .then((employeeNames) => {
    // console.log('Employee Names:', employeeNames);
    if (!employeeNames || employeeNames.length === 0) {
      console.log("No employees found. Nothing to update.");
      start();
      return;
    }

    // This populates the choices array for the following inquirer prompt.
    // The data is nested so that's why index 0 is needed here:
    const choices = employeeNames[0].map((employee) => {
      // console.log('Employee:', employee);
      // console.log('Employee ID:', employee.id);
      // console.log('First Name:', employee.first_name);
      // console.log('Last Name:', employee.last_name);
      // console.log('Occupation ID:', employee.occupation_id);
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: {
          employeeId: employee.id,
          occupationId: employee.occupation_id,
        },
      };
    });

    inquirer
      .prompt([
        {
          type: 'list',
          message: 'Choose an employee to update from the list below:',
          name: 'employeeId',
          choices: choices,
        },
        {
          type: 'list',
          message: 'Select new role (occupation) from the list below:',
          name: 'occupationId',
          choices: ["1: Director","2: Software Engineer","3: Janitor","4: Historian","5: Accountant","6: Master Inspector","7: Supervisor"]
        },
      ])
      .then(async (userChoice) => {
        try {
          // console.log(JSON.stringify(userChoice));
          console.log(`\nCurrent Employee ID #: ${userChoice.employeeId.employeeId}`);
          console.log(`New Role (occupation): ${userChoice.occupationId}`);

          // The new role is added here, notice the second arg is being parsed for int from choices array:
          await updateEmployeeOccupation(userChoice.employeeId.employeeId, parseInt(Array.from(userChoice.occupationId)[0]));
          outputOrangeText(`\nEmployee role (occupation) updated!\n`);
          start();
        } catch (error) {
          console.error(error);
          start();
        }
      });
  })
  .catch((error) => {
    console.error("Error retrieving employee names:", error);
    start();
  });
}

start();