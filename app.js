const express = require('express');

const app = express();
const apiRouter = require('./routers/api-router');
const {
    send404,
    send405,
    handleCustomErrors,
    handleInternalErrors
} = require('./controllers/errors');

app.use(express.json());
app.use('/api', apiRouter);
app.all('/*', send404)

app.use(handleCustomErrors)
app.use(handleInternalErrors)

module.exports = app