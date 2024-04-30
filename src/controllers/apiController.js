const User = require("../models/user.js")
const { uploadSingleFile, uploadMultipleFiles } = require("../services/fileService.js")
const getUsersAPI = async (req, res) => {
    const results = await User.find({})
    return res.status(200).json({
        errorCode: 0,
        data: results,
    })
}

const postCreateUsersAPI = async (req, res) => {
    let { email, name, city } = req.body
    let user = await User.create({
        email: email,
        name: name,
        city: city,
    })
    return res.status(201).json({
        errorCode: 0,
        data: user,
    })
}
const putEditUsersAPI = async (req, res) => {
    let { id, email, name, city } = req.body
    let q = { id: req.params.id }
    const results = await User.findOneAndUpdate(q, {
        email: email,
        name: name,
        city: city
    })
    return res.status(202).json({
        errorCode: 0,
        data: results,
    })
}
const deleteUsersAPI = async (req, res) => {
    let { id } = req.body
    let q = { id: id }
    const results = await User.deleteOne(q)

    return res.status(202).json({
        errorCode: 0,
        data: results,
    })
}

const postUploadSingleFile = async (req, res) => {
    console.log("req.files:", req.files)
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).send("No files were uploaded.")
    }

    let results = await uploadSingleFile(req.files.image)
    console.log(results)
    return res.send("single file")
}

const postUploadMultipleFile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).send("No files were uploaded.")
    }
    if (Array.isArray(req.files.image)) {
        let results = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    }
    else {
        let results = await uploadSingleFile(req.files.image)
        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    }

}

module.exports = { getUsersAPI, postCreateUsersAPI, putEditUsersAPI, deleteUsersAPI, postUploadSingleFile, postUploadMultipleFile }