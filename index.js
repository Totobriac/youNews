var grabPics = require("./grabPics");
var grabData = require("./data");
var createVid = require("./createVid");
var editPics = require("./editPics");


async function generateVideo() {

	var data = await grabData.getData();

	var pics = await grabPics.grabPics(data);

	var editedPics = await editPics.editPics(pics);
		
	var vid = await createVid.createVid(pics);

	console.log("VIDEO DONE");
	
}

generateVideo();