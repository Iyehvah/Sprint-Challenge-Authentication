//addons
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require("cookie-parser")

//middleware
const restrict = require("./auth/restrict")
const authenticate = require('./auth/authenticate-middleware');

//routers
const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router');

const server = express();

//addons being put into action
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser())

//routes
server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, restrict("admin"), jokesRouter);

const PORT = process.env.PORT || 3300;

server.get("/", (req, res, next) => {
  res.status(200).json({
      message: "Welcome to the sprint challenge"
  })
})

if(!module.parent) {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = server
