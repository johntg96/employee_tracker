// this script is for the SQL queries

// console.table(data) // <- this is built into node and will display a table in the console
// use functions for each one of the queries you do.
const inquirer = require("inquirer");
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
  return connection.promise().query(`SELECT * from occupation`);
}

function listAllEmployees() {
  return connection.promise().query(`SELECT * from employee`);
}


module.exports = {
  listAllDepartments,
  listAllOccupations,
  listAllEmployees
}