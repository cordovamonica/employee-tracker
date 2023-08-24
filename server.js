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
            'Update an employee',
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
        if (action === 'Update an employee') {
            updateEmployee();
        }
        if (action === 'Exit') {
            connection.end();
        }
    });
};

viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of the department?'
        }
    ])
    .then(answer => {
        connection.query('INSERT INTO department SET ?', answer, (err, res) => {
            if (err) throw err;
            console.log('Department added.');
            start();
        });
    });
}

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department ID for this role?'
        }
    ])
    .then(answer => {
        connection.query('INSERT INTO role SET ?', answer, (err, res) => {
            if (err) throw err;
            console.log('Role added.');
            start();
        });
    });
};

addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the employee\'s role ID?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the employee\'s manager ID?'
        }
    ])
    .then(answer => {
        connection.query('INSERT INTO employee SET ?', answer, (err, res) => {
            if (err) throw err;
            console.log('Employee added.');
            start();
        });
    });
};

updateEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'What is the ID of the employee you would like to update?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the employee\'s new role ID?'
        }
    ])
    .then(answer => {
        connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.role_id, answer.employee_id], (err, res) => {
            if (err) throw err;
            console.log('Employee updated.');
            start();
        }
        );
    });
};

    