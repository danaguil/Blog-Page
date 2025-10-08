// creating schema and model for users
const mongoose = require('mongoose');

// schema for the table, the structure of the document
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// creating model, Users is the name of the collection in db
const UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel;