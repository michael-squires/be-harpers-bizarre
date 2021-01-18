const express = require('express');
const cors = require('cors');

const app = express();
const apiRouter = require('./routers/api-router');
const {
    send404,
    handleSQLErrors,
    handleCustomErrors,
    handleInternalErrors
} = require('./controllers/errors');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRouter);
app.all('/*', send404)

app.use(handleSQLErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors;)

module.exports = app