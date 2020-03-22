const router = require('express').Router();
const bcrypt = require("bcryptjs")
const Users =require("../users/users-model")
const jwt = require("jsonwebtoken")
const db = require("../database/dbConfig")

router.get("/" , async  (req, res) => {
  const users = await db("users")
  res.status(201).json(users)
})

router.post('/register', async  (req, res) => {
  // implement registration
  try {
    //pulls username from req.body
    const { username } = req.body
    //looks for existing user with that username entered
    const user = await Users.findBy({ username }).first()
    //if username already EXISTS return this error
    if(user) {
      return res.status(409).json({
        message: "That username already exists"
      })
    //otherwise procede to add the new user to our users table
    } else {
      res.status(201).json(await Users.add(req.body))
    }
  } catch(error) {
    next(error)
  }
});

router.post('/login', async (req, res) => {
  // implement login
  try {
    //pulls username and password from the request body
    const { username, password } = req.body
    //looks for an existing user by that username
    const user = await Users.findBy({ username }).first()

    //if that user does NOT exist it will return this error
      if(!user) {
        return res.status(401).json({
          message: "Invalid Credentials"
        })
      } 

      //here it will compare the password entered to the hashed password in our database
      const passwordValidation = await bcrypt.compare(password, user.password)
      //if the password was tampered with or doesnt match it will return this error
      if(!passwordValidation) {
        return res.status(401).json({
          message: "Invalid Credentials"
        })
      //otherwise it will procede to log you in and give you a token
      } else {
        const payload = {
          userId: user.id,
          userRole: "admin"
        }
        //sets a header with the value of our token
        const token = jwt.sign(payload, process.env.MY_SECRET)
        res.cookie("token", token)

        res.json({
          message: `Welcome ${user.username}`
        })
      }
  } catch(error) {
    next(error)
  }
});

module.exports = router;
