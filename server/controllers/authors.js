const Author = require('../models/author');

exports.getAllAuthors = (req, res) => {
    Author.find({}, (err, authors) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving all the authors' });
        }
        res.status(200).send(authors);
    });
};

exports.getAuthorByID = (req, res) => {
    const id = req.params.id;
    Author.find({id: id}, (err, author) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving authors by id' });
        }
        if(author.length == 0){
            return res.status(400).send({ error: 'No author with that ID' });
        }
        res.status(200).send(author[0]);
    });
};

exports.getAuthorsBio = (req, res) => {
    const id = req.params.id;
    Author.find({id: id}, (err, author) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving authors by id' });
        }
        if(author.length == 0){
            return res.status(400).send({ error: 'No author with that ID' });
        }
        res.status(200).send(author[0].biography);
    });
};