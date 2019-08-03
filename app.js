const mongoose = require('mongoose');
const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { userNewParser: true })
  .then(() => console.log('connected to mongodb!'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {});
app.get('/', (req, res) => res.send('hello from the mern intro'));
