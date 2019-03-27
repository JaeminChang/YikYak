const yikService = require("../services/yikService");

const express = require("express");

const router = express.Router();

router.get("/yikYak", (req, res) => {
  yikService
    .selectAllYik()
    .then(response => {
      res.json(response.recordset);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/yikYak/getPost", (req, res) => {
  yikService
    .selectById(req.query.id)
    .then(response => {
      res.json(response.recordset);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/comment", (req, res) => {
  yikService
    .selectByPostId(req.query.id)
    .then(response => {
      res.json(response.recordset);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/yikYak", (req, res) => {
  yikService
    .insertYik(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/comment", (req, res) => {
  yikService
    .insertComment(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.put("/yikYak", (req, res) => {
  yikService
    .updateLikes(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.put("/comment", (req, res) => {
  yikService
    .updateCommentLikes(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.delete("/yikYak", (req, res) => {
  yikService
    .deleteYik(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.delete("/comment", (req, res) => {
  yikService
    .deleteComment(req.query.id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
