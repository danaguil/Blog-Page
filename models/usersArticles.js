// creating schema and model for users and their articles 
const mongoose = require('mongoose');

// schema for the table, the structure of the document
const userSchema = new mongoose.Schema({
    username: String,
    articles: [
        {
            title: String,
            content: String,
            date: { type: Date, default: Date.now }
        }
    ]
});

// creating model, Users is the name of the collection in db
const UserModel = mongoose.model('Users Articles', userSchema);
module.exports = UserModel;