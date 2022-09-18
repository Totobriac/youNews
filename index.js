var grabPics = require("./grabPics");
var grabData = require("./data");
var createVid = require("./createVid");
var editPics = require("./editPics");
var addText = require("./addText");
var upload = require("./upload.js");

const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send("Hello world !!");
});

app.listen(port, () => {
  console.log("Server app listening on port " + port);
});

async function generateVideo() {
  // var data = await grabData.getData();

  // var text = await addText.createText(data);

  // var pics = await grabPics.grabPics(data);

  // var editedPics = await editPics.editPics(pics);

  // var vid = await createVid.createVid(pics, text);

  var up = await upload.uploadVideo("caca","pipi","funny");

  console.log("VIDEO DONE NOW UPLOAD");
}

generateVideo();
