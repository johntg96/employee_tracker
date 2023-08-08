USE employees_db;

INSERT INTO department (name)
VALUES  ("Super Science"),            -- 1
        ("Quality Control"),          -- 2
        ("Production"),               -- 3
        ("Maintenance"),              -- 4
        ("Financial"),                -- 5
        ("Human Services"),           -- 6
        ("Research and Development"), -- 7
        ("Engineering");              -- 8

INSERT INTO occupation (title, salary, department_id)
VALUES  ("Director", 1000000, 1),         -- 1
        ("Software Engineer", 85000, 8),  -- 2
        ("Janitor", 19000, 4),            -- 3
        ("Historian", 90000, 7),          -- 4
        ("Accountant", 84000, 5),         -- 5
        ("Master Inspector", 55000, 2),   -- 6
        ("Supervisor", 85500, 1);         -- 7


INSERT INTO manager (first_name, last_name)
VALUES
  ("Joe", "Dirt"),  -- 1
  ("Keith", "McCluck"),  -- 2
  ("Jessica", "Anderson"); -- 3

INSERT INTO employee (first_name, last_name, manager_id, occupation_id, department_id)
VALUES  ("Rob", "Rogers", 1, 1, 1), -- 1
        ("Mary", "Jade", 2, 2, 7),     -- 2
        ("Joe", "Blue", 3, 5, 5),      -- 3
        ("John", "Doe", 1, 4, 1),   -- 4
        ("Sarah", "Smith", 2, 6, 6),   -- 5
        ("Jeremy", "Dublin", 1, 7, 8), -- 6
        ("Jake", "Porter", 2, 3, 4);   -- 7
