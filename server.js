const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;

// database
const db = require('./models');

// serve static assets
app.use(express.static(__dirname + '/public'));

// ------ MIDDLEWARE ------
// configure bodyParser to use both JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// GET root
app.get('/', (req, res) => {
    res.sendFile('views/index.html', {
        root: __dirname
    });
});

// GET admin
app.get('/admin', (req, res) => {
    res.sendFile('views/admin.html', {
        root: __dirname
    });
});

// GET API users
app.get('/api/users', (req, res) => {
    db.User.find()
        .catch(err => res.json({
            error: err
        }))
        .then(allUsers => {
            res.json(allUsers);
        });
});

// GET API user
// SHOW by mongoDB ID
app.get('/api/users/:id', (req, res) => {
    db.User.findOne({
            _id: req.params.id
        })
        .catch(err => res.json({
            error: err
        }))
        .then(foundUser => {
            foundUser === null ? res.json({
                error: `No user found with ID ${req.params.id}`
            }) : res.json(foundUser);
        });
});

// POST API user
app.post('/api/users', (req, res) => {
    let user = req.body;
    // ------ INPUT VALIDATION ------
    // first and last name is required
    if (!user.firstName) return res.json({
        error: 'Please enter a valid first name.'
    });
    if (!user.lastName) return res.json({
        error: 'Please enter a valid last name.'
    });
    // name cannot contain number
    if (user.firstName.match(/\d+/g) || user.lastName.match(/\d/g)) return res.json({
        error: 'User names cannot contain numbers.'
    });
    // name must be at least two letters
    if (!user.firstName.charAt(2) || !user.lastName.charAt(2)) return res.json({
        error: 'Your first and last name must be at least 2 characters long.'
    });
    // name cannot contain special characters
    let nameRegex = RegExp('^[a-zA-Z ]{2,30}$');
    if (!nameRegex.test(user.firstName) || !nameRegex.test(user.lastName)) return res.json({
        error: 'Your name cannot contain special characters.'
    });
    // email is required
    if (!user.email) return res.json({
        error: 'Please enter a valid email address.'
    });
    //email must contain exactly one @
    if (user.email.match(/@[^@]*@/)) return res.json({
        error: 'Email cannot contain more than one @.'
    });
    // email must contain at least one period
    if (!user.email.match(/\.+/g)) return res.json({
        error: 'Email address must contain at least one period.'
    });

    db.User.create(req.body, (err, createdUser) => {
        if (err) return res.json(err);
        res.json(createdUser);
    });
});

// START SERVER
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));