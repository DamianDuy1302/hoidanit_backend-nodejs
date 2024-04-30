const { createTask, getAllTaskss, editTask, deleteTaskk } = require("../services/taskService")

const postCreateTask = async (req, res) => {
    const result = await createTask(req.body)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}
const getAllTasks = async (req, res) => {
    const result = await getAllTaskss(req.query)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}
const putEditTask = async (req, res) => {
    const result = await editTask(req.body)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}
const deleteTask = async (req, res) => {
    const result = await deleteTaskk(req.body)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}


module.exports = {
    postCreateTask,
    getAllTasks,
    putEditTask,
    deleteTask
}