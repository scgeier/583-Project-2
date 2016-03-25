var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var db = require('./config/db');
var contact = require('./controllers/contact');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/contacts', contact.list); //Read the main page (the list of contacts)

app.get('/contact/new', contact.form); //Read the New Contact page (that makes a new entry in the address book)
app.post('/contacts', contact.create); //Create the new contact

app.post('/contacts/:id', contact.update); //Update the contact info
app.get('/contacts/:id', contact.show); //Read the edit contact page 

app.get('/contacts/delete/:id', contact.remove); //Delete a contact

db.connect('mongodb://localhost:27017/test', function(err) {
    console.log("MongoDB connected...");
    app.listen(8080, function() {
        console.log("Express started...");
    });
});
