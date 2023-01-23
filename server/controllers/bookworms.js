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
        const userFullData = users.map((user) => {
            return new Promise((resolve, reject) => {
                Loan.findOne({ username: user.username, returned: false }, (err, loan) => {
                    if (err) {
                        reject(err);
                    }
                    if (!loan) {
                        user.dueToReturn = false
                    } else {
                        user.dueToReturn = true
                    }
                        
                    resolve(user)
                })
            });
        });

        Promise.all(userFullData)
            .then((results) => {
                res.status(200).json(results);
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ error: 'Error while retrieving bookworms' });
            });
    });
};