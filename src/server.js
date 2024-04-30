require('dotenv').config()
const express = require('express')

const configViewEngine = require("./config/viewEngine.js")
const staticFiles = require("./config/staticFiles.js")
const connection = require("./config/database.js")
const fileUpload = require("express-fileupload")
const { MongoClient } = require("mongodb")


const webRoutes = require("./routes/web.js")
const apiRoutes = require("./routes/api.js")
const app = express()
const port = process.env.PORT || 8081
const hostname = process.env.HOST_NAME


//config fileupload
app.use(fileUpload())

//config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));


//config template engine
configViewEngine(app)

//config static files
staticFiles(express, app)


//config routes
app.use("/", webRoutes);
app.use("/v1/api/", apiRoutes);



//connect db
(async () => {
    try {
        //using mongoose connection
        await connection();


        //using mongodb driver connection
        // Connection URL
        // const url = process.env.DB_HOST_WITH_DRIVER;
        // const client = new MongoClient(url);

        // // Database Name
        // const dbName = process.env.DB_NAME;

        // await client.connect();
        // console.log("Connected successfully to server");

        // const db = client.db(dbName)
        // const collection = db.collection("customers")
        // await collection.insertOne({
        //     name: "HoiDanIT",
        //     email: "hoidanit@gmail.com"
        // })
        await app.listen(port, hostname, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
    catch (err) {
        console.log("Can not connect to DB", err)
    }
})()

