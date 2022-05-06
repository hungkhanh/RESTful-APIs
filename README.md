# RESTful-APIs
Install package: npm install <br />
Dev: npm run dev <br />
Release: npm run production <br />

# CRUD
1. Customers

| HTTP Verbs |        /customers       | /customers/:customerNumber |
|------------|:-----------------------:|:--------------------------:|
|     GET    |    Get all customers    |      Get one customer      |
|    POST    | Create one new customer |              -             |
|    PATCH   |            -            |     Update one customer    |
|   DELETE   |   Delete all customers  |    Delete one customers    |

2. Employees

| HTTP Verbs |        /employees       | /employees/:employeeNumber |
|------------|:-----------------------:|:--------------------------:|
|     GET    |    Get all employees    |      Get one employee      |
|    POST    | Create one new employee |              -             |
|    PATCH   |            -            |     Update one employee    |
|   DELETE   |   Delete all employees  |     Delete one employee    |

# Associations

|         Route /employees         |        Description        |
|:--------------------------------:|:-------------------------:|
| /:employeeNumber/getAllCustomers | Get customers of employee |
|   /:employeeNumber/getAllStaffs  |   Get staffs of employee  |
