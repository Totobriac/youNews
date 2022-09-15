var ffmpeg = require('fluent-ffmpeg');

exports.createVid = async (pics) => {
	var video = await boo(pics);
	console.log(video);
	return pics;
}

function boo() {
	return new Promise((resolve, reject) => {
		try {
			var proc = new ffmpeg();

			proc.addInput('pics/%d.jpg')
				.on('start', () => {
					console.log("starting");
				})
				.on('progress', () => {
					console.log("progressing");
				})
				.on('end', () => {
					resolve();
				})
				.on('error', (error) => {
					console.log(error);
				})
				.addInputOption('-framerate 1/3')
				.outputOptions(['-c:v libx264', '-r 30', '-pix_fmt yuv420p'])
				.output('out.mp4')
				.run();
		} catch (e) {
			console.log(e);
		}
	})
}

