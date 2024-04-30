const express = require("express")
const { getUsersAPI, postCreateUsersAPI, putEditUsersAPI, deleteUsersAPI, postUploadSingleFile, postUploadMultipleFile } = require("../controllers/apiController.js")
const { postCreateCustomer, postCreateCustomers, getAllCustomers, putEditCustomer, deleteCustomer, deleteCustomers } = require("../controllers/customerController.js")
const { postCreateProject, getAllProjs, putEditProj, deleteProj } = require("../controllers/projectController.js")
const { postCreateTask, getAllTasks, putEditTask, deleteTask } = require("../controllers/taskController.js")
const routerAPI = express.Router()

//users
routerAPI.get("/users", getUsersAPI)
routerAPI.post("/users", postCreateUsersAPI)
routerAPI.put("/users", putEditUsersAPI)
routerAPI.delete("/users", deleteUsersAPI)
routerAPI.post("/file", postUploadSingleFile)
routerAPI.post("/files", postUploadMultipleFile)

//customers
routerAPI.post("/customers", postCreateCustomer)
routerAPI.post("/customersMulti", postCreateCustomers)
routerAPI.get("/customers", getAllCustomers)
routerAPI.put("/customers", putEditCustomer)
routerAPI.delete("/customers", deleteCustomer)
routerAPI.delete("/customersMulti", deleteCustomers)

//req.query
routerAPI.get("/info", (req, res) => {
    return res.status(200).json({
        data: req.query
    })
})


//project
routerAPI.post("/projects", postCreateProject)
routerAPI.get("/projects", getAllProjs)
routerAPI.put("/projects", putEditProj)
routerAPI.delete("/projects", deleteProj)

//tasks
routerAPI.post("/tasks", postCreateTask)
routerAPI.get("/tasks", getAllTasks)
routerAPI.put("/tasks", putEditTask)
routerAPI.delete("/tasks", deleteTask)


module.exports = routerAPI