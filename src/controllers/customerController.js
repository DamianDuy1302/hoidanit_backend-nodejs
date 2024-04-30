const { createCustomer, createCustomers, getAllCustomers, editCustumer, deleteCustomer, deleteCustomers } = require("../services/customerService");
const { uploadSingleFile } = require("../services/fileService");
const Joi = require("joi")
//api-query-params
const aqp = require("api-query-params")

//cach viet khac de exports handler
module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, description } = req.body;
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            address: Joi.string(),
            phone: Joi.string(),
            // .pattern(new RegExp('^[0-9]{0, 100}$')),

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            description: Joi.string(),
        })
        const { error } = schema.validate(req.body, {
            abortEarly: false
        })
        if (error) {
            return res.status(200).json({
                message: error
            })
        }
        else {
            let imgUrl = "";
            if (!req.files || Object.keys(req.files).length == 0) {
                // return res.status(400).send("No files were uploaded.")
            }
            else {
                let results = await uploadSingleFile(req.files.image)
                imgUrl = results.path
                console.log(imgUrl)
            }

            let customer = {
                name, address, phone, email, description, image: imgUrl,
            }
            let result = await createCustomer(customer)
            return res.status(200).json({
                errorCode: 0,
                data: result
            })
        }

    },

    postCreateCustomers: async (req, res) => {

        let result = await createCustomers(req.body.customers)
        if (result) {
            return res.status(200).json({
                errorCode: 0,
                data: result
            })
        }
        else {
            return res.status(500).json({
                errorCode: -1,
                data: result
            })
        }

    },
    getAllCustomers: async (req, res) => {
        let q = req.query
        let result = await getAllCustomers(q)
        if (result) {
            return res.status(200).json({
                errorCode: 0,
                data: result
            })
        }
        else {
            return res.status(500).json({
                errorCode: -1,
                data: null
            })
        }
    },
    putEditCustomer: async (req, res) => {
        let data = req.body
        let result = await editCustumer(data)
        if (result) {
            return res.status(200).json({
                errorCode: 0,
                data: result
            })
        }
        else {
            return res.status(500).json({
                errorCode: -1,
                data: result
            })
        }
    },
    deleteCustomer: async (req, res) => {
        let id = req.body.id
        let result = await deleteCustomer(id)
        if (result) {
            return res.status(200).json({
                errorCode: 0,
                data: result
            })
        }
        else {
            return res.status(500).json({
                errorCode: -1,
                data: result
            })
        }
    },
    deleteCustomers: async (req, res) => {
        let ids = req.body.ids
        let result = await deleteCustomers(ids)
        if (result) {
            return res.status(200).json({
                errorCode: 0,
                data: result
            })
        }
        else {
            return res.status(500).json({
                errorCode: -1,
                data: result
            })
        }
    }
}