const path = require("path")
const staticFiles = (express, app) => {
    app.use(express.static(path.join("./src", "public")))
}

module.exports = staticFiles