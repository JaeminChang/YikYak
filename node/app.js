const express = require("express");
const app = express();
const port = 3000;
const yikService = require("./services/yikService");
const cors = require("cors");

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.get("/api/yikYak", (req, res) => {
  yikService
    .selectAllYik()
    .then(response => {
      res.json(response.recordset);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get("/api/yikYak/getPost", (req, res) => {
  yikService
    .selectById(req.query.id)
    .then(response => {
      res.json(response.recordset);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get("/api/comment", (req, res) => {
  yikService
    .selectByPostId(req.query.id)
    .then(response => {
      res.json(response.recordset);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post("/api/yikYak", (req, res) => {
  yikService
    .insertYik(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post("/api/comment", (req, res) => {
  yikService
    .insertComment(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.put("/api/yikYak", (req, res) => {
  yikService
    .updateLikes(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.put("/api/comment", (req, res) => {
  yikService
    .updateCommentLikes(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.delete("/api/yikYak", (req, res) => {
  yikService
    .deleteYik(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.delete("/api/comment", (req, res) => {
  yikService
    .deleteComment(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
