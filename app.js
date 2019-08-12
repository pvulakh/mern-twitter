const mongoose = require('mongoose');
const express = require('express');
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');
const bodyParser = require('body-parser');
const passport = require('passport');

mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('connected to mongodb!'))
.catch(err => console.log(err));

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/tweets', tweets);