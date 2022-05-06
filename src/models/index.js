import { Sequelize, DataTypes } from "sequelize";

import dbConfig from "../config/dbConfig";

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);

sequelize.authenticate()    // return a promise
.then(() => {
    console.log('connected...');
})
.catch(err => {
    console.log(`Error: ${err}`);
});

const db = {};

db.Sequelize = Sequelize;   // class
db.sequelize = sequelize;   // instance
db.queryInterface = sequelize.getQueryInterface();

// import models
import customers from "./customersModel";
import employees from "./employeesModel";
db.customers = customers(sequelize, DataTypes);
db.employees = employees(sequelize, DataTypes);

db.sequelize.sync({ force: false })
.then(() => {
    console.log('Sync done!');
})
.catch(err => {
    console.log(`Error: ${err}`);
})

// Associations
// employees[employeeNumber] 1 --- n customers[salesRepEmployeeNumber]
db.employees.hasMany(db.customers, {
    foreignKey: 'salesRepEmployeeNumber',
    as: 'customer',
});

db.customers.belongsTo(db.employees, {
    foreignKey: 'salesRepEmployeeNumber',
    as: 'employee'
});

// SELF Foreign Key: employees[employeeNumber] 1 --- n employees[reportsTo]
db.employees.hasMany(db.employees, {
    foreignKey: 'reportsTo',
    as: 'staff'
});

module.exports = db;