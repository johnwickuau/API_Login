const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/corredor');

const corredorRoutes = require('./routes/corredor');

app.use('/users', userRoutes);
app.use('/corredor', userRoutes);

module.exports = app;