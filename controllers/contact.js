var db = require('../config/db');

exports.list = function(req, res) {//the function for showing the list of contacts in the homepage
    var collection = db.get().collection('contacts');

    collection.find({}).toArray(function(err, results) {//now you're in Mongo-land; find all of the documents in the Users collection and display them with the list.ejs templating engine//
        res.render('contact/list', {contacts: results});//{contacts:results} is the data that you will be rendering//
    });
};

exports.show = function(req, res) {//the function for showing the Update page for each user you want to update
    var collection = db.get().collection('contacts');

    collection.find({"name": req.params.id}).limit(1).toArray(function(err, results) {//req.params is a built-in Express property; it says, "Use the github username of whatever user the person has chosen to update (the '/users/:id' path in the index.js file) as the value in the {key:value} Mongo matching system//
        res.render('contact/show', {contact: results[0]});
    });
};

exports.update = function(req, res) {
    var collection = db.get().collection('contacts');

    collection.updateOne(//updateOne is a built-in Mongo property
        {name: req.params.id},
        {
            $set: {
                name: req.body.name,
                business: req.body.business,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                notes:req.body.notes
            }
        }
    );

    res.redirect('/contacts');
};

exports.form = function(req, res) {
    res.render('contact/form');
}

exports.create = function(req, res) {
    var collection = db.get().collection('contacts');

    collection.insert({
                name: req.body.name,
                business: req.body.business,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                notes: req.body.notes
    });

    res.redirect('/contacts');
};

exports.remove = function(req, res) {
    var collection = db.get().collection('contacts');

    collection.removeOne({
        name: req.params.id
    });

    return res.redirect('/contacts');
};