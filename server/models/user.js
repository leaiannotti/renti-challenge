const mongoose = require('mongoose');
const { LIBRARIAN_ROLE, BOOKWORM_ROLE, DEFAULT_USER_FIRSTNAME,DEFAULT_USER_LASTNAME } = require('../config/constants');

const UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        default: DEFAULT_USER_FIRSTNAME
    },
    lastName:  {
        type:String,
        default: DEFAULT_USER_LASTNAME 
    },
    password:  {
        type:String,
        required: true,
    },
    username:  {
        type:String,
        required: true,
    },
    role:{
        type: String,
        default: BOOKWORM_ROLE, //I'll not receive the role in the request, there is only one librarian
        enum:[LIBRARIAN_ROLE, BOOKWORM_ROLE]
    },
    dueToReturn:{
        type:Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', UserSchema);