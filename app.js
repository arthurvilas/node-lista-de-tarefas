const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

// Middleware
// app.use(express.static('./public')); // Front end not done
app.use(express.json());

// Routes
app.use('/api/v1/tasks', tasks);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to DB...");
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();