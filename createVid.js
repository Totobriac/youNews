const Fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');

exports.createVid = async (pics) => {
	var video = await boo(pics);
	console.log(video);
	return pics;
}

function boo(pics) {

	return new Promise((resolve, reject) => {
		try {
			var proc = new ffmpeg();

			proc
				.input(pics + '/1.jpg').loop(60)
				.input(pics + '/2.jpg').loop(60)
				.input(pics + '/3.jpg').loop(60)
				.input(pics + '/4.jpg').loop(60)
				.input(pics + '/5.jpg').loop(60)
				.input(pics + '/6.jpg').loop(60)
				.input(pics + '/7.jpg').loop(60)
				.input(pics + '/8.jpg').loop(60)
				.input(pics + '/9.jpg').loop(60)
				.input(pics + '/10.jpg').loop(60)
				.input(pics + '/11.jpg').loop(60)
				.input(pics + '/12.jpg').loop(60)			
				.input(pics + '/13.jpg').loop(60)
				.input(pics + '/14.jpg').loop(60)
				.input(pics + '/15.jpg').loop(60)
				.input(pics + '/16.jpg').loop(60)
				.input(pics + '/17.jpg').loop(60)
				.input(pics + '/18.jpg').loop(60)
				.input(pics + '/19.jpg').loop(60)
				.input(pics + '/20.jpg').loop(60)							
				
				.filterGraph([ 
					'[0][1]xfade=transition=slideright:duration=1:offset=2[V1]',
					'[V1][2]xfade=transition=slideleft:duration=1:offset=5[V2]',
					'[V2][3]xfade=transition=slideup:duration=1:offset=8[V3]',
					'[V3][4]xfade=transition=slidedown:duration=1:offset=11[V4]',
					'[V4][5]xfade=transition=slideright:duration=1:offset=14[V5]',
					'[V5][6]xfade=transition=slideleft:duration=1:offset=17[V6]',
					'[V6][7]xfade=transition=slideup:duration=1:offset=20[V7]',
					'[V7][8]xfade=transition=slidedown:duration=1:offset=23[V8]',
					'[V8][9]xfade=transition=slideright:duration=1:offset=26[V9]',
					'[V9][10]xfade=transition=slideleft:duration=1:offset=29[V10]',
					'[V10][11]xfade=transition=slideup:duration=1:offset=32[V11]',
					'[V11][12]xfade=transition=slidedown:duration=1:offset=35[V12]',
					'[V12][13]xfade=transition=slideright:duration=1:offset=38[V13]',
					'[V13][14]xfade=transition=slideleft:duration=1:offset=41[V14]',
					'[V14][15]xfade=transition=slideup:duration=1:offset=44[V15]',
					'[V15][16]xfade=transition=slidedown:duration=1:offset=47[V16]',
					'[V16][17]xfade=transition=slideright:duration=1:offset=50[V17]',
					'[V17][18]xfade=transition=slideleft:duration=1:offset=53[V18]',
					'[V18][19]xfade=transition=slideup:duration=1:offset=56',
					//'[V19][20]xfade=transition=slidedown:duration=1:offset=59',
				])
				
				.on('start', () => {	
					console.log("starting");
				})
				.on('end', () => {
					Fs.rmSync(pics, { recursive: true });
					resolve();
				})
				.on('error', (error) => {
					Fs.rmSync(pics, { recursive: true });
					console.log(error);
				})	
				.outputOptions(['-c:v libx264', '-r 30', '-pix_fmt yuv420p'])
				.output('out.mp4')
				.run()				
		} catch (e) {
			Fs.rmSync(pics, { recursive: true });
			console.log(e);
		}
	})
}

