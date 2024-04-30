const Project = require("../models/project")
const aqp = require("api-query-params")
module.exports = {
    createProject: async (prj) => {
        // console.log(prj)
        try {
            if (prj.type == "EMPTY-PROJECT") {
                const result = await Project.create({
                    name: prj.name,
                    startDate: prj.startDate,
                    endDate: prj.endDate,
                    description: prj.description,
                    customerInfor: prj.customerInfor,
                    usersInfor: [],
                    // usersInfor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
                    leader: prj.leader,
                    tasks: [],
                    // tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]

                })
                return result
            }
            if (prj.type == "ADD-USERS") {
                // find project by id
                let myProject = await Project.findById(prj.projectId).exec()
                for (let i = 0; i < prj.usersArr.length; i++) {
                    if (!myProject.usersInfor.includes(prj.usersArr[i])) {
                        await myProject.usersInfor.push(prj.usersArr[i])
                    }
                    else {
                        console.log("cant not add")
                    }
                }

                let result2 = await myProject.save()
                return result2
            }
            if (prj.type == "ADD-TASKS") {
                // find project by id
                let myProject = await Project.findById(prj.projectId).exec()
                console.log(myProject)
                console.log(prj)
                for (let i = 0; i < prj.tasksArr.length; i++) {
                    if (!myProject.tasks.includes(prj.tasksArr[i])) {
                        await myProject.tasks.push(prj.tasksArr[i])
                    }
                    else {
                        console.log("cant not add task")
                    }
                }

                let result2 = await myProject.save()
                return result2
            }
            if (prj.type == "REMOVE-USERS") {
                let myProject = await Project.findById(prj.projectId)
                for (let i = 0; i < prj.usersArr.length; i++) {
                    myProject.usersInfor.pull(prj.usersArr[i])
                }
                let result2 = await myProject.save()
                return result2
            }

        } catch (err) {
            console.log(err)
        }

    },

    getAllProjects: async (query) => {
        try {
            if (query) {
                const { filter, limit, population } = aqp(query)
                delete filter.page
                let skip = (parseInt(query.page - 1)) * parseInt(limit)
                let result = await Project.find({}).populate(population).limit(parseInt(limit)).skip(skip)
                return result
            }

        } catch (err) {
            console.log(err)
        }

    },

    editProject: async (data) => {
        try {
            if (data) {
                const result = Project.findOneAndUpdate({ _id: data.id }, {
                    name: data.name,
                    endDate: data.endDate,
                    description: data.description
                })
                return result
            }
        } catch (err) {
            console.log(err)
        }
    },
    deleteProject: async (id) => {
        try {
            let result = Project.deleteById(id)
            return result
        } catch (err) {
            console.log(err)
        }
    }
}