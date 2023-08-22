
const inquirer = require('inquirer');
const mysql = require('mysql');

const port = process.env.PORT || 3001;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Breezypup2017!',
    database: 'employee_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
}
);

promptUser = () => {
    inquirer.prompt([
        {
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
            ]
        }
    ]).then((answer) => {
        switch (answer.action) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
        }
    })
};

viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

viewAllDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

viewAllRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'roleId',
            message: "What is the employee's role ID?"
        },
        {
            type: 'input',
            name: 'managerId',
            message: "What is the employee's manager ID?"
        }
    ]).then((answer) => {
        connection.query('INSERT INTO employee SET ?',
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId
            },
            (err, res) => {
                if (err) throw err;
                console.log('Employee added!');
                promptUser();
            }
        )
    })
}

addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: "What is the name of the department?"
        }
    ]).then((answer) => {
        connection.query('INSERT INTO department SET ?',
            {
                name: answer.departmentName
            },
            (err, res) => {
                if (err) throw err;
                console.log('Department added!');
                promptUser();
            }
        )
    })
}

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: "What is the name of the role?"
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary of the role?"
        },
        {
            type: 'input',
            name: 'departmentId',
            message: "What is the department ID of the role?"
        }
    ]).then((answer) => {
        connection.query('INSERT INTO role SET ?',
            {
                title: answer.roleName,
                salary: answer.salary,
                department_id: answer.departmentId
            },
            (err, res) => {
                if (err) throw err;
                console.log('Role added!');
                promptUser();
            }
        )
    })
}

promptUser();
