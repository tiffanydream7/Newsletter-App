const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/user';

mongoose.connect(DB_URL, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

// import User
const User = require('./user');

// export User
module.exports = {
    User
};