const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.send({ msg: "testing tweets route!"}));

module.exports = router;