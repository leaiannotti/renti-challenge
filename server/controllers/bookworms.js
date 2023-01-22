const User = require('../models/user');
const Loan = require('../models/loan');
const { BOOKWORM_ROLE } = require('../config/constants');

exports.getAllBookworms = (req, res) => {
    const {name} = req.query;
    let query = {};
    if (name) {
        query.username = {'$regex': name}
    } 
    query.role = BOOKWORM_ROLE
    User.find(query, (err, users) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving bookworms' });
        }
        Loan.findOne({ userID: users.id, returned: false }, (err, loan) => {
            if (err) {
                reject(err);
            }
            if (!loan) {
                users[0].dueToReturn = false
            } else {
                users[0].dueToReturn = true
            }
        });
        res.status(200).send(users);
    });
};