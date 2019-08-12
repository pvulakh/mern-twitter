const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const User = require('../../models/User');
const passport = require('passport');
//"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTBhN2M3YjFhZmVmNzM3MzQxODE5ZSIsImlhdCI6MTU2NTU3MDQ4OCwiZXhwIjoxNTY1NTc0MDg4fQ.RFvbs4A0Tu5fhGAkU4rIUgrcYN8S4lflGuvEyDztHxc"
router.get("/test", (req, res) => res.json({ msg: "users route testing!"}));

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ 
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
})

router.post("/register", (req, res) => {
  // check that the provided email doesn't already have an associated account
  User.findOne({ email: req.body.email})
    .then(user => {
      if (user) {
        return res.status(400).json({email: 'This email already has an associated account.'})
      } else {
        const newUser = new User({
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password
        })

        // create encrypted password before saving user to db
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: 'no registered user with this email!'});
    }

    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        const payload = { id: user.id, name: user.name };

        jwt.sign(
          payload, 
          keys.secretOrKey, 
          { expiresIn: 3600},
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token 
            });
          });
      } else {
        return res.status(400).json({ password: 'incorrect password!'});
      }
    })
  })
})

module.exports = router;