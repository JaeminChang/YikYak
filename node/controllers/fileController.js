const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const fs = require("fs");
const mime = require("mime-types");
const uuid = require("uuid");
const IncomingForm = require("formidable").IncomingForm;

const fileService = require("../services/fileServices");

AWS.config.update({
  secretAccessKey: "ki/JXhzHvKzfdgo38MZkBoVW+65sfee38Ab4VPNs",
  accessKeyId: "AKIAJFHQM26ZDEONP2VQ"
});

router.post("/upload-image", (req, res) => {
  const promises = [];
  const form = new IncomingForm();
  form.multiples = true;

  form.on("file", (field, file) => {
    let fileName = "";
    let buffer = null;

    buffer = fs.readFileSync(file.path);
    fileName = file.name;

    let upload = {};
    upload.fileName = fileName;
    upload.userName = field;

    const type = mime.contentType(fileName);
    upload.fileType = type;

    let key = `yikYak/` + uuid.v4() + `-` + fileName;
    upload.fileUrl = key;

    const uploadPromise = fileService
      .upload(fileName, buffer, key)
      .then(() => fileService.storeFile(upload))
      .catch(err => {
        throw err;
      });

    promises.push(uploadPromise);
  });

  form.on("end", () => {
    Promise.all(promises)
      .then(values => {
        let urls = [];
        for (let i = 0; i < values.length; i++) {
          urls.push("https://sabio-s3.s3.us-west-2.amazonaws.com/" + values[i]);
        }
      })
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        throw err;
      });
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err;
    }
  });
});

module.exports = router;
