const Task = require("../models/task")
const aqp = require("api-query-params")

module.exports = {
    createTask: async (data) => {
        try {
            if (data.type === "EMPTY-TASK") {
                const result = await Task.create({
                    name: data.name,
                    description: data.description,
                    status: data.status,
                    startDate: data.startDate,
                    endDate: data.endDate,
                })
                return result
            }
        } catch (err) {
            console.log(err)
        }
    },
    editTask: async (data) => {
        console.log(data)
        try {
            const result = await Task.findOneAndUpdate({ _id: data.id }, {
                // name: data.name,
                // status: data.status,
                // endDate: data.endDate,
                ...data
            })
            return result
        } catch (err) {
            console.log(err)
        }
    },
    getAllTaskss: async (data) => {
        try {
            const { filter, limit } = aqp(data)
            delete filter.page
            let skip = parseInt(data.page - 1) * parseInt(limit)
            const result = await Task.find(filter).limit(limit).skip(skip)
            return result
        } catch (err) {
            console.log(err)
        }
    },
    deleteTaskk: async (data) => {
        try {
            const result = await Task.deleteById(data.id)
            return result
        } catch (err) {
            console.log(err)
        }
    },
}