const connection = require("../config/database.js")
const getAllUsers = async () => {
    const [results, fields] = await connection.query('select * from Users')
    return results
}

const getUserById = async (id) => {
    const [results, fields] = await connection.query('select * from Users where id = ?', [id])
    let user = results && results.length > 0 ? results[0] : {}
    return user
}
const deleteUserById = async (id) => {
    const [results, fields] = await connection.query('DELETE FROM Users where id = ?', [id])
    return results
}

module.exports = { getAllUsers, getUserById, deleteUserById }