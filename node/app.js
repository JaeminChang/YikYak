const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const routes = require("./routes");

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: false }));

app.use(`/`, routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
