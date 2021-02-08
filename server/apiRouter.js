const express = require('express')
const apiRouter = express.Router()
const usersRouter = require("./users/usersRouter");
const vacationsRouter = require("./vacations/vacationsRouter")

apiRouter.use('/users', usersRouter)
apiRouter.use('/vacations', vacationsRouter)

module.exports = apiRouter;