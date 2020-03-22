const usersModel = require("./users-model")
const db =require("../database/dbConfig")


// //ADD USER ROUTE TESTED 2 THINGS USERNAME AND PASSWORD
// test("add user", async () => {
//     const res = await usersModel.insert({ username: "admin12", password: "admin1003"})
//     expect(res.username).toBe("admin12")
//     expect(res.password).toBe("admin1003")
// })
// //test above works but got to change the username and password everytime. Its not a seed its actual data so i cant fix that unless i keep deleting the user from the database everytime i create it.

test("findById", async () => {
    const res = await usersModel.findById(1)
    expect(res.username).toBe("admin")
})

test("remove", async () => {
    await usersModel.remove(1)
    const users = await db("users")
    const expected = ["admin"]
    expect(users).toEqual(expect.not.arrayContaining(expected))
})

