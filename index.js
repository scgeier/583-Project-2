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

app.get('/contacts', contact.list); //list page 

app.get('/contact/new', contact.form); //new action (for Reading the form page that makes a new user)
app.post('/contacts', contact.create); //new action (for Creating the new user)

app.post('/contacts/:id', contact.update); //edit action (for Updating the user info); :id tells Express to automatically use the selected user name for the name at the end of the path
app.get('/contacts/:id', contact.show); //Read the updating form 

app.get('/contacts/delete/:id', contact.remove); //delete action (for Deleting the user)

db.connect('mongodb://localhost:27017/test', function(err) {
    console.log("MongoDB connected...");
    app.listen(8080, function() {
        console.log("Express started...");
    });
});
