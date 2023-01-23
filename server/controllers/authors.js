const Author = require('../models/author');

exports.getAllAuthors = (req, res) => {
    const { name } = req.query;
    let query = {};
    if(name)
    {
        query.title = {'$regex': name}
    }
    Author.find(query, (err, authors) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving all the authors' });
        }
        res.status(200).send(authors);
    });
};

exports.getAuthorByID = (req, res) => {
    const id = req.params.id;
    Author.findOne({authorid: id}, (err, author) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving authors by id' });
        }
        if(!author){
            return res.status(400).send({ error: 'No author with that ID' });
        }
        res.status(200).send(author);
    });
};

exports.getAuthorsBio = (req, res) => {
    const id = req.params.id;
    Author.findOne({authorid: id}, (err, author) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving authors by id' });
        }
        if(!author){
            return res.status(400).send({ error: 'No author with that ID' });
        }
        res.status(200).send(author.biography);
    });
};