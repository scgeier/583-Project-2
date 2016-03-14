var db = require('../config/db');

exports.list = function(req, res) {//the function for showing the list of contacts in the homepage
    var collection = db.get().collection('contacts');

    collection.find({}).toArray(function(err, results) {//now you're in Mongo-land; find all of the documents in the Users collection and display them with the list.ejs templating engine//
        res.render('contact/list', {contacts: results});//{contacts:results} is the data that you will be rendering//
    });
};

exports.show = function(req, res) {//the function for showing the Update page for each user you want to update
    var collection = db.get().collection('contacts');

    collection.find({"last": req.params.id}).limit(1).toArray(function(err, results) {//req.params is a built-in Express property; it says, "Use the first name of whatever contact the person has chosen to update (the '/contacts/:id' path in the index.js file) as the value in the {key:value} Mongo matching system//
        res.render('contact/show', {contact: results[0]});
    });
};

exports.update = function(req, res) {
    var collection = db.get().collection('contacts');

    collection.updateOne(//updateOne is a built-in Mongo property
        {last: req.params.id},
        {
            $set: {
                first: req.body.first,
                last: req.body.last,
                business: req.body.business,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                state:req.body.state,
                zip:req.body.zip,
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
                first: req.body.first,
                last: req.body.last,
                business: req.body.business,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                state:req.body.state,
                zip:req.body.zip,
                notes: req.body.notes
    });

    res.redirect('/contacts');
};

exports.remove = function(req, res) {
    var collection = db.get().collection('contacts');

    collection.removeOne({
        last: req.params.id
    });

    return res.redirect('/contacts');
};
