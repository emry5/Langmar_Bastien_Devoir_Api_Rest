const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const bcrypt   = require('bcrypt');

const User = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Le nom est requis']
    },
    firstname: {
        type: String,
        trim: true
    },
    email: {
        type     : String,
        trim     : true,
        required : [true, "L'email est requis"],
        unique   : true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true
    }

},{
    timestamps: true 
});



module.exports = mongoose.model('User', User);



