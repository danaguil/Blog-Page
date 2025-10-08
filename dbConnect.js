require('dotenv').config(); // load env variables from .env file

const mongoose = require('mongoose'); // importing mongoose

// creating connection to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;