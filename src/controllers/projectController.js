
const { createProject, getAllProjects, editProject, deleteProject } = require("../services/projectService");
const postCreateProject = async (req, res) => {
    const result = await createProject(req.body)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}
const getAllProjs = async (req, res) => {
    const result = await getAllProjects(req.query)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}
const putEditProj = async (req, res) => {
    const result = await editProject(req.body)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}
const deleteProj = async (req, res) => {
    let id = req.body.id
    const result = await deleteProject(id)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}


module.exports = {
    postCreateProject,
    getAllProjs,
    putEditProj,
    deleteProj
}