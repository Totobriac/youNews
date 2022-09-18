var grabPics = require("./grabPics");
var grabData = require("./data");
var createVid = require("./createVid");
var editPics = require("./editPics");
var addText = require("./addText");

async function generateVideo() {
  var data = await grabData.getData();

  var text = await addText.createText(data);

  var pics = await grabPics.grabPics(data);

  var editedPics = await editPics.editPics(pics);

  var vid = await createVid.createVid(pics, text);

  console.log("VIDEO DONE");
}

generateVideo();
