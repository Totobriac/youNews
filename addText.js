const Fs = require('fs');

var logger = Fs.createWriteStream('log.srt', {
  flags: 'a' 
})

var writeLine = (line) => logger.write(`\n${line}`);


exports.createText = async (data) => {	
	await writeText(data);
	return;	
}

var writeText = async(data) => {
	for (let i = 0; i < data.length; i ++) {

		writeLine(data[i].slug)
	}
	logger.end()
}