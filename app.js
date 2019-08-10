const mongoose = require('mongoose');
const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');
const bodyParser = require('body-parser');

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('connected to mongodb!'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {});
app.get('/', (req, res) => res.send('hello from the mern intro'));
app.use('/api/users', users);
app.use('/api/tweets', tweets);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());