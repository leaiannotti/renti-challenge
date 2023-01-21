const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        default: "Default First Name" 
    },
    lastName:  {
        type:String,
        default: "Default Last Name" 
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
        default: 'Bookworm', //I'll not receive the role in the request, there is only one librarian
        enum:['Librarian', 'Bookworm']
    }
});

module.exports = mongoose.model('User', UserSchema);