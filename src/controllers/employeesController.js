import db from "../models";

const Employee = db.employees
const Customer = db.customers

// 1. get all employees
const getAllEmployees = async (req, res) => {
    try {
        let employees = await Employee.findAll({});
        res.status(200).send(employees);    
    } catch (error) {
        console.log(error);
    }
}

// 2. create a employee
const createEmployee = async (req, res) => {
    let data = req.body;
    try {
        const employee = await Employee.create(data);
        res.status(200).json({
            success: true,
            data: employee
        })
    } catch (error) {
        console.log(error);
    }
}

// 3. delete all employees
const deleteAllEmployees = async (req, res) => {
    const CONSTRAINT_CUSTOMERS_EMPLOYEES = 'customers_ibfk_1';
    const CUSTOMERS_TABLE = 'customers';
    try {
        await db.queryInterface.removeConstraint(CUSTOMERS_TABLE, CONSTRAINT_CUSTOMERS_EMPLOYEES);
        await Employee.truncate();
        res.status(200).json({
            success: true,
            message: "Delete all employees"
        });
    } catch (error) {
        console.log(error);
    }
}

// 4. get one employee by Id
const getOneEmployee = async (req, res) => {
    let employeeNumber = req.params.employeeNumber;
    try {
        let employee = await Employee.findByPk(employeeNumber);
        res.status(200).send(employee);
    } catch (error) {
        console.log(error);
    }
}

// 5. update info employee PATCH by Id
const updateEmployee = async (req, res) => {
    let employeeNumber = req.params.employeeNumber;
    let data = req.body;
    try {
        // let employee = await Employee.update(data, { where: { employeeNumber: employeeNumber}});
        // res.status(200).send(employee);
        await Employee.update(data, { where: { employeeNumber: employeeNumber}});
        res.status(200).json({
            success: true,
            message: "Update a employee"
        });
    } catch (error) {
        console.log(error);
    }
}

// 6. delete one employee by Id
const deleteOneEmployee = async (req, res) => {
    let employeeNumber = req.params.employeeNumber;
    try {
        await Employee.destroy({ where: { employeeNumber: employeeNumber}});
        res.status(200).json({
            success: true,
            message: "Delete a employee"
        });
    } catch (error) {
        console.log(error);
    }
}

// 7. get all customers of an employee
const getCusomtersOfEmployee = async (req, res) => {
    let employeeNumber = req.params.employeeNumber;
    try {
        const data = await Employee.findAll({
            include: [{
                model: Customer,
                as: 'customer'
            }],
            where: { employeeNumber: employeeNumber}
        });
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
}

// 8. get all staff of an employee
const getStaffsOfEmployee = async (req, res) => {
    let employeeNumber = req.params.employeeNumber;
    try {
        const data = await Employee.findAll({
            include: [{
                model: Employee,
                as: 'staff'
            }],
            where: { employeeNumber: employeeNumber }
        });
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllEmployees,
    createEmployee,
    deleteAllEmployees,

    getOneEmployee,
    updateEmployee,
    deleteOneEmployee,

    getCusomtersOfEmployee,
    getStaffsOfEmployee,
}