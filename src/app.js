/* eslint-disable no-unused-vars */
const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const routes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use('/', routes);

app.use((err, request, response, next) => {
  console.log('got error');
  return response.status(err.statusCode).json(err);
});
module.exports = app;
