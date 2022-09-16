var Jimp = require("jimp");


exports.editPics = async (data) => {
	await editTheBack(data);
	console.log(data);
	await composePic(data);
	return;
}

var editTheBack = async (data) => {
	for (let i = 1; i < 21; i++) {
		var eff = await Jimp.read(data + '/' + i + '.jpg')
			.then(image => {
				image
					.crop(241, 0, 222, 396)
					.opacity(.1)
					.gaussian(3)
					.grayscale()
					.resize(704, Jimp.AUTO)
					.write(data + '/' + i + 'back.png');
			})
			.catch(err => {
				console.error(err);
			});
	}
}


var composePic = async (data) => {
	for (let i = 1; i < 21; i++) {
		var eff = await Jimp.read(data + '/' + i + 'back.png')
			.then(back => {
				Jimp.read(data + '/' + i + '.jpg')
					.then(front => {
						back
							.composite(front, 0, 700)
							.write(data + '/' + i + 'final.png');
					})
					.catch(err => {
						console.error(err);
					});
			})
			.catch(err => {
				console.error(err);
			});
	}
}