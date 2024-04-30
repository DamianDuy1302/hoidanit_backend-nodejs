const express = require("express")
const router = express.Router()
const { getHomePage, deleteUserPage, postCreateUser, createUserPage, editUserPage, postEditUser, postDeleteUser } = require("../controllers/homeController.js")

router.get("/", getHomePage)
router.get('/createUser', createUserPage)
router.get('/editUser/:id', editUserPage)
router.post('/deleteUser/:id', deleteUserPage)

router.post("/createUserNoti", postCreateUser)
router.post("/editUserNoti", postEditUser)
router.post("/deleteUserNoti", postDeleteUser)


module.exports = router