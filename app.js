const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// Middleware
// app.use(express.static('./public')); // Front end not done
app.use(express.json());

// Routes
app.use('/api/v1/tasks', tasks);
// Not Found
app.use(notFound);
// Error
app.use(errorHandler)

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