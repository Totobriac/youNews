var grabPics = require("./grabPics");
var grabData = require("./data");

var data;
var pics;

async function generateVideo() {

	data = await grabData.getData();

	pics = await grabPics.grabPics(data);
		
	console.log(pics);
	
}

generateVideo();