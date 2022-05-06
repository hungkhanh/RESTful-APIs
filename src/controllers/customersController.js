import db from "../models";

const Customer = db.customers

// 1. get all customers
const getAllCustomers = async (req, res) => {
    try {
        let customers = await Customer.findAll({});
        res.status(200).send(customers);    
    } catch (error) {
        console.log(error);
    }
}

// 2. create a customer
const createCustomer = async (req, res) => {
    let data = req.body;
    try {
        const customer = await Customer.create(data);
        res.status(200).json({
            success: true,
            data: customer
        })
    } catch (error) {
        console.log(error);
    }
}

// 3. delete all customers
const deleteAllCustomers = async (req, res) => {
    try {
        await Customer.truncate();
        res.status(200).json({
            success: true,
            message: "Delete all customers"
        });
    } catch (error) {
        console.log(error);
    }
}

// 4. get one customer by Id
const getOneCustomer = async (req, res) => {
    let customerNumber = req.params.customerNumber;
    try {
        let customer = await Customer.findByPk(customerNumber);
        res.status(200).send(customer);
    } catch (error) {
        console.log(error);
    }
}

// 5. update info customer PATCH by Id
const updateCustomer = async (req, res) => {
    let customerNumber = req.params.customerNumber;
    let data = req.body;
    try {
        // let customer = await Customer.update(data, { where: { customerNumber: customerNumber}});
        // res.status(200).send(customer);
        await Customer.update(data, { where: { customerNumber: customerNumber}});
        res.status(200).json({
            success: true,
            message: "Update a customer"
        });
    } catch (error) {
        console.log(error);
    }
}

// 6. delete one customer by Id
const deleteOneCustomer = async (req, res) => {
    let customerNumber = req.params.customerNumber;
    try {
        await Customer.destroy({ where: { customerNumber: customerNumber}});
        res.status(200).json({
            success: true,
            message: "Delete a customer"
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllCustomers,
    createCustomer,
    deleteAllCustomers,

    getOneCustomer,
    updateCustomer,
    deleteOneCustomer,
}