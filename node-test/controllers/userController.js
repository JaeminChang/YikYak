const userService = require("../services/userService");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  userService
    .insertUser(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/", (req, res) => {
  userService
    .selectUser(req.query)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
