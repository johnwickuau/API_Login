const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/user');

const corredorRoutes = require('./routes/corredor');

const voltasRoutes = require('./routes/voltas');

    

app.use('/users', userRoutes);
app.use('/corredor', corredorRoutes);
app.use('/voltas', voltasRoutes);


module.exports = app;