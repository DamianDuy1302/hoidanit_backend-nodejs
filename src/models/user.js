const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    city: String,
})

const User = new mongoose.model("user", userSchema)

module.exports = User