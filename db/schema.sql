-- Drop the database if it exists (optional).
DROP DATABASE IF EXISTS employees_db;

-- Create the database.
CREATE DATABASE employees_db;

-- Use the employees_db.
USE employees_db;

-- Create the department table.
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

-- Create the position table.
CREATE TABLE position (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create the employee table.
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  position_id INT,
  department_id INT DEFAULT NULL,
  FOREIGN KEY (position_id) REFERENCES position(id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);