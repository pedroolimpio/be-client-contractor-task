/* eslint-disable no-unused-vars */
const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

const contractRoutes = require('./routes/contracts/routes');
const jobsRoutes = require('./routes/jobs/routes');
const balancesRoutes = require('./routes/balances/routes');
const adminRoutes = require('./routes/admin/routes');

app.use('/contracts', contractRoutes);
app.use('/jobs', jobsRoutes);
app.use('/balances', balancesRoutes);
app.use('/admin', adminRoutes);

app.use((err, request, response, next) => {
  console.log(err);
  return response.status(err.statusCode).json(err);
});
module.exports = app;
