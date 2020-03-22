const supertest = require("supertest")
const server = require("./index")

//sort of a virtual axios we can make a request to our server now
test("welcomeRoute", async () => {
    const res = await supertest(server).get("/")
//WRITE ASSERTION
//does it return expected STATUS CODE
    expect(res.statusCode).toBe(200)
//does it return the expected DATA FORMAT (json/xml whatever)
    expect(res.type).toBe("application/json")
//does it return the expected data itself
    expect(res.body.message).toBe("Welcome to the sprint challenge")
})

// test("jokesRoute", async (req) => {
//     const loggedIn = req.cookie

//     if(loggedIn) {
//         const res  = await supertest(server).get("/api/jokes")
//         expect(res.statusCode).toBe(200)
//         expect(res.type).toBe("application/json")
//     }
// })
