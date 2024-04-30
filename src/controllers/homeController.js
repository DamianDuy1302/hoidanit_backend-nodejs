const connection = require("../config/database.js")
const User = require("../models/user.js")
const { getAllUsers, getUserById, deleteUserById } = require("../services/CRUDService.js")

const getHomePage = async (req, res) => {
    const results = await User.find({})
    console.log(results)
    return res.render("home.ejs", { data: results })
}
const createUserPage = (req, res) => {
    return res.render("createUser.ejs")
}
const editUserPage = async (req, res) => {
    // const results = await getUserById(req.params.id)

    const results = await User.findById(req.params.id)
    return res.render("editUser.ejs", { data: results })
}
const deleteUserPage = async (req, res) => {
    const results = await User.findById(req.params.id)
    return res.render("deleteUser.ejs", { data: results })
}
const postCreateUser = async (req, res) => {
    let { email, name, city } = req.body
    // const [results, fields] = await connection.query(
    //     `INSERT INTO Users (email, name, city)
    //     VALUES(?, ?, ?)`, [email, name, city])
    await User.create({
        email: email,
        name: name,
        city: city,
    })
    // const newUser = User({
    //     email: email,
    //     name: name,
    //     city: city
    // })
    // newUser.save()
    res.redirect('/')
}
const postEditUser = async (req, res) => {
    let { id, email, name, city } = req.body
    // const [results, fields] = await connection.query(
    //     `UPDATE Users
    //     SET email = ?, name=?, city=?
    //     WHERE id=?;`
    //     , [email, name, city, id])

    // console.log(results)
    let q = { id: req.params.id }
    const results = await User.findOneAndUpdate(q, {
        email: email,
        name: name,
        city: city
    })
    res.redirect('/')
}
const postDeleteUser = async (req, res) => {
    let { id, email } = req.body
    let q = { id: id }
    await User.deleteOne(q)

    res.redirect('/')
}
module.exports = { getHomePage, deleteUserPage, postCreateUser, postEditUser, postDeleteUser, createUserPage, editUserPage }