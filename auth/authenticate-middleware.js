const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
  try {
    //pulls token from our created cookies header
    const { token } = req.cookies
    //if token does NOT EXIST return this error
    if(!token) {
      res.status(401).json({
        message: "YOU SHALL NOT PASSSSS"
      })
    }

    //if token does exist then make sure the token secret wasnt tampered with and if it was then return this ERROR
    jwt.verify(token, process.env.MY_SECRET , (error, decoded) => {
      if(error) {
        res.status(401).json({
          message: "YOU SHALL NOT PASSSSS"
        })
      }
      //otherwise decode the token and move on
      req.token = decoded
      next()
    })
  } catch(error) {
    next(error)
  }
}