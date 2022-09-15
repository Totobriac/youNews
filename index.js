var grabPics = require("./grabPics");
var grabData = require("./data");
var createVid = require("./createVid");

var data;
var pics;

async function generateVideo() {

	data = await grabData.getData();

	pics = await grabPics.grabPics(data);
		
	vid = await createVid.createVid(pics);

	console.log("VIDEO DONE");
	
}

generateVideo();