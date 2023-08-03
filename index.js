const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

//  db.query('sql syntax here with ? for injected variables', variableToInject, function (err, results) => {
//    console.log(results);
//  })

