const express = require('express');
const rootRoutes = require('./routes/root');

const app = express();
app.use('/', rootRoutes);

module.exports = app;
