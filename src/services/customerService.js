const Customer = require("../models/customer");

const aqp = require("api-query-params")

const createCustomer = async (customer) => {
    try {
        let result = await Customer.create({
            name: customer.name,
            address: customer.address,
            phone: customer.phone,
            email: customer.email,
            description: customer.description,
            image: customer.image
        })
        return result
    } catch (err) {
        console.log(err)
        return null
    }
}

const createCustomers = async (customers) => {
    try {
        let result = await Customer.insertMany(customers)
        return result
    } catch (err) {
        console.log(err)
        return null
    }
}
const getAllCustomers = async (q) => {
    try {
        if (q) {
            const { filter, limit } = aqp(q)
            console.log(filter)
            delete filter.page
            console.log(filter)
            let skip = (parseInt(q.page) - 1) * parseInt(limit)
            let result = await Customer.find(filter).limit(parseInt(limit)).skip(parseInt(skip))
            return result
        }
        else {
            let result = await Customer.find({})
            return result
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
const editCustumer = async (data) => {
    try {
        let result = await Customer.findOneAndUpdate({ _id: data.id }, {
            name: data.name,
            email: data.email
        })
        return result
    } catch (err) {
        console.log(err)
        return null
    }
}
const deleteCustomer = async (id) => {
    try {
        let result = await Customer.deleteById(id)
        return result
    } catch (err) {
        console.log(err)
        return null
    }
}
const deleteCustomers = async (ids) => {
    try {
        let result = await Customer.delete({ _id: { $in: ids } })
        return result
    } catch (err) {
        console.log(err)
        return null
    }
}
module.exports = {
    createCustomer,
    createCustomers,
    getAllCustomers,
    editCustumer,
    deleteCustomer,
    deleteCustomers
}