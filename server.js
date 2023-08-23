const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Breezypup2017!',
    database: 'employee_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the employee database.');
    start();
});

const start = () => {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add an employee',
            'Add a department',
            'Add a role',
            'Exit'
        ]
    })
    .then(answer => {
        const { action } = answer;
        if (action === 'View all employees') {
            viewEmployees();
        }
        if (action === 'View all departments') {
            viewDepartments();
        }
        if (action === 'View all roles') {
            viewRoles();
        }
        if (action === 'Add an employee') {
            addEmployee();
        }
        if (action === 'Add a department') {
            addDepartment();
        }
        if (action === 'Add a role') {
            addRole();
        }
        if (action === 'Exit') {
            connection.end();
        }
    });
};

viewDepartments = () => {
    console.log('Show all departments');
    const sql = 'SELECT * FROM department';

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.log(rows);
        });
        };
        
viewRoles = () => {
    console.log('Show all roles');
    const sql = 'SELECT * FROM role';

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.log(rows);
        });
        };

viewEmployees = () => {
    console.log('Show all employees');
    const sql = 'SELECT * FROM employee';

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.log(rows);
        });
        };

addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What department would you like to add?',
            validate: addDepartment => {
                if (addDepartment) {
                    return true;
                } else {
                    console.log('Please enter a department.');
                    return false;
                }
        }
}])
    .then(answer => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        connection.query(sql, answer.addDepartment, (err, result) => {
            if (err) throw err;
            console.log('Department added.');
            start();
        }
        );
    });
};

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addTitle',
            message: 'What role would you like to add?',
            validate: addTitle => {
                if (addTitle) {
                    return true;
                } else {
                    console.log('Please enter a role.');
                    return false;
                }
        }
},
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?',
            validate: salary => {
                if (salary) {
                    return true;
                } else {
                    console.log('Please enter a salary.');
                    return false;
                }
        }
},
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department ID for this role?',
            validate: department_id => {
                if (department_id) {
                    return true;
                } else {
                    console.log('Please enter a department ID.');
                    return false;
                }
        }
}])
    .then(answer => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        connection.query(sql, [answer.title, answer.salary, answer.department_id], (err, result) => {
            if (err) throw err;
            console.log('Role added.');
            start();
        }
        );
    });
}

addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee\'s first name?',
            validate: firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log('Please enter a first name.');
                    return false;
                }
        }
},
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee\'s last name?',
            validate: lastName => {
                if (lastName) {
                    return true;
                } else {
                    console.log('Please enter a last name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role ID for this employee?',
            validate: role_id => {
                if (role_id) {
                    return true;
                } else {
                    console.log('Please enter a role ID.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the manager ID for this employee?',
            validate: manager_id => {
                if (manager_id) {
                    return true;
                } else {
                    console.log('Please enter a manager ID.');
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        connection.query(sql, [answer.firstName, answer.lastName, answer.role_id, answer.manager_id], (err, result) => {
            if (err) throw err;
            console.log('Employee added.');
            start();
        }
        );
    });
}

// promptUser();

    