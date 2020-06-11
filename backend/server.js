const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Set up middleware:
app.use(cors());
app.use(express.json());

// MongoDB config:
const uri = process.env.ATLAS_URI;
mongoose.connect(uri , { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
});

// Require the routes for the crud api
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

// Link front-end views to the routes:
app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});