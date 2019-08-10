const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.get("/test", (req, res) => res.json({ msg: "users route testing!"}));

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

module.exports = router;