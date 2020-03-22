const bcrypt = require("bcryptjs")
const db = require("../database/dbConfig")


async function insert(user) {
    const [id] = await db("users").insert(user)
    return db("users").where("id", id).first()
}
function getAll() {
    return db("users")
}

function find(){
    return db("users").select("id", "username")
}


function findBy(filter){
    return db("users").select("id", "username", "password").where(filter)
}


function findById(id){
    return db("users").select("id", "username").where({id}).first()
}

async function add(user){ 
    user.password = await bcrypt.hash(user.password, 13)
    const [id] = await db("users").insert(user)
    return findById(id)
}

function remove(id) {
    return db("users").where("id", id).del()
}

module.exports = {
    insert,
    getAll,
    add,
    find,
    findBy,
    findById,
    remove,
}