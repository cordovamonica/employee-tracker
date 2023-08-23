INSERT INTO departments (name) 
VALUES ('Sales'), ('Finance'), ('Human Resources');

INSERT INTO role (department_id, title, salary)
VALUES (1, 'Sales Lead', 40000), (2, 'Account Manager', 50000), (3, 'HR Manager', 60000);

INSERT INTO employee (role_id, manager_id, first_name, last_name)
VALUES (2, 3, 'Mike', 'Chan'), (3, null, 'Ashley', 'Rodriguez'), (1, 3, 'Malia', 'Brown');