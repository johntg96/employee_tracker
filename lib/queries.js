// this script is for the SQL queries
// console.table(data) // <- this is built into node and will display a table in the console
// use functions for each one of the queries you do.
const connection = require("../config/connection");

/*
  We are making use of a mysql2 method called promise() which allows us to 
  perform our database query asynchronously. This means we don't need to use
  .then() blocks or callback functions, which makes it much easier run the queries 
  and return values from them.
*/

function listAllDepartments() {
  return connection.promise().query(`SELECT department.id, department.name FROM department;`);
}

function listAllOccupations() {
  return connection.promise().query(`SELECT occupation.id, occupation.title, occupation.salary, occupation.department_id from occupation`);
}

function listAllEmployees() {
  return connection.promise().query(`
    SELECT 
      e.id AS employee_id,
      CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
      d.name AS department_name,
      o.title AS occupation_title,
      o.salary AS occupation_salary,
      CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager_name
    FROM employee e
    LEFT JOIN department d ON e.department_id = d.id
    LEFT JOIN occupation o ON e.occupation_id = o.id
    LEFT JOIN manager mgr ON e.manager_id = mgr.id
  `);
}

function addDepartment(departmentName) {
  return connection.promise().query('INSERT INTO department (name) VALUES (?)', [departmentName]);
}

function addOccupation(title, salary, department_id) {
  return connection.promise().query('INSERT INTO occupation (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
}

function addEmployee(firstName, lastName, occupation_id, department_id) {
  return connection.promise().query('INSERT INTO employee (first_name, last_name, occupation_id, department_id) VALUES (?, ?, ?, ?)', [firstName, lastName, occupation_id, department_id]);
}

function getEmployeeNames() {
  return connection.promise().query('SELECT id, first_name, last_name, occupation_id FROM employee');
}

function updateEmployeeOccupation(employeeId, occupationId) {
  return connection.promise().query('UPDATE employee SET occupation_id = ? WHERE id = ?', [occupationId, employeeId]);
}


module.exports = {
  listAllDepartments,
  listAllOccupations,
  listAllEmployees,
  addDepartment,
  addOccupation,
  addEmployee,
  getEmployeeNames,
  updateEmployeeOccupation
}