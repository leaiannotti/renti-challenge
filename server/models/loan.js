const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    bookID: Number,
    bookwormID: Number,
    loanDate:Date,
    returnDate: {
        type: Date,
        default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 3);
            return date;
        }

    },
    returned: Boolean
});

module.exports = mongoose.model('Loan', LoanSchema);