const apiRouter = require('express').Router();

apiRouter.use('/topics', topicsRouter)


module.exports = apiRouter;