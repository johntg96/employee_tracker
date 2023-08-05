// this script is for displaying the results
// when you are getting array data back from MySQL, you must place it in brackets for it to work.. []
const inquirer = require("inquirer");


function displayData(data){
  console.log("\n");
  console.table(data);
}

module.exports = {
  displayData
}