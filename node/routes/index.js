const express = require("express");
const yikController = require("../controllers/yikYakControllers");
const userController = require("../controllers/userController");
const fileController = require("../controllers/fileController");
//const FilesController = require("../controllers/FilesController");
const router = express.Router();

//router.use(`/files`, FilesController);
router.use(`/api`, yikController);
router.use(`/user`, userController);
router.use(`/files`, fileController);

module.exports = router;
