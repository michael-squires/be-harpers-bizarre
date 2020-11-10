const express = require('express');

const app = express();

app.use(express.json());

const apiRouter = require('./routers/api-router');






module.exports = app