var db = require('../config/db');

exports.list = function(req, res) {
    var collection = db.get().collection('contacts');

    collection.find({}).toArray(function(err, results) { 
        res.render('contact/list', {contacts: results});
    });
};

exports.show = function(req, res) {
    var collection = db.get().collection('contacts');

    collection.find({"last": req.params.id}).limit(1).toArray(function(err, results) { 
        res.render('contact/show', {contact: results[0]});
    });
};

exports.update = function(req, res) {
    var collection = db.get().collection('contacts');

    collection.updateOne(
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
                state: req.body.state,
                zip: req.body.zip,
                notes: req.body.notes
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
