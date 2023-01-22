const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    bookID: Number,
    username:String,
    loanDate:{
        type:Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 3);
            return date;
        }

    },
    returned: {
        type:Boolean,
        default: false
    }
});

module.exports = mongoose.model('Loan', LoanSchema);