const Fs = require("fs");
var ffmpeg = require("fluent-ffmpeg");

exports.createVid = async (pics, text) => {
  var assTxt = await convert();
  var video = await chain(pics);
  var videoSib = await addText();

  return;
};

function convert() {
  return new Promise((resolve, reject) => {
    try {
      var proc = new ffmpeg();

      proc
        .input("./log.srt")
        .on("start", () => {
          console.log("starting converting");
        })
        .on("end", () => {
          Fs.rmSync("./log.srt", { recursive: true });
          resolve();
        })
        .on("error", (error) => {
          console.log(error);
        })
        .output("./log.ass")
        .run();
    } catch (e) {
      console.log(e);
    }
  });
}

function addText() {
  return new Promise((resolve, reject) => {
    try {
      var proc = new ffmpeg();

      proc
        .input("./out.mp4")
        .input("./news_music.mp3")
        .on("start", () => {
          console.log("starting text");
        })
        .on("end", () => {
          Fs.rmSync("./out.mp4", { recursive: true });
          resolve();
        })
        .on("error", (error) => {
          Fs.rmSync("./out.mp4", { recursive: true });
          console.log(error);
        })
        .complexFilter([
          "subtitles=./log.ass:force_style='Fontname=Futura,Alignment=6,MarginV=30'",
        ])
        .outputOptions([
          "-c:v libx264",
          "-r 30",
          "-pix_fmt yuv420p",          
        ])
        .output("video.mp4")
        .run();
    } catch (e) {
      Fs.rmSync("./out.mp4", { recursive: true });
      console.log(e);
    }
  });
}

function chain(pics) {
  return new Promise((resolve, reject) => {
    try {
      var proc = new ffmpeg();

      proc
        .input(pics + "/1final.png")
        .loop(60)
        .input(pics + "/2final.png")
        .loop(60)
        .input(pics + "/3final.png")
        .loop(60)
        .input(pics + "/4final.png")
        .loop(60)
        .input(pics + "/5final.png")
        .loop(60)
        .input(pics + "/6final.png")
        .loop(60)
        .input(pics + "/7final.png")
        .loop(60)
        .input(pics + "/8final.png")
        .loop(60)
        .input(pics + "/9final.png")
        .loop(60)
        .input(pics + "/10final.png")
        .loop(60)
        .input(pics + "/11final.png")
        .loop(60)
        .input(pics + "/12final.png")
        .loop(60)
        .input(pics + "/13final.png")
        .loop(60)
        .input(pics + "/14final.png")
        .loop(60)
        .input(pics + "/15final.png")
        .loop(60)
        .input(pics + "/16final.png")
        .loop(60)
        .input(pics + "/17final.png")
        .loop(60)
        .input(pics + "/18final.png")
        .loop(60)
        .input(pics + "/19final.png")
        .loop(60)
        .input(pics + "/20final.png")
        .loop(60)

        .filterGraph([
          "[0][1]xfade=transition=slideright:duration=1:offset=2[V1]",
          "[V1][2]xfade=transition=slideleft:duration=1:offset=5[V2]",
          "[V2][3]xfade=transition=slideup:duration=1:offset=8[V3]",
          "[V3][4]xfade=transition=slidedown:duration=1:offset=11[V4]",
          "[V4][5]xfade=transition=slideright:duration=1:offset=14[V5]",
          "[V5][6]xfade=transition=slideleft:duration=1:offset=17[V6]",
          "[V6][7]xfade=transition=slideup:duration=1:offset=20[V7]",
          "[V7][8]xfade=transition=slidedown:duration=1:offset=23[V8]",
          "[V8][9]xfade=transition=slideright:duration=1:offset=26[V9]",
          "[V9][10]xfade=transition=slideleft:duration=1:offset=29[V10]",
          "[V10][11]xfade=transition=slideup:duration=1:offset=32[V11]",
          "[V11][12]xfade=transition=slidedown:duration=1:offset=35[V12]",
          "[V12][13]xfade=transition=slideright:duration=1:offset=38[V13]",
          "[V13][14]xfade=transition=slideleft:duration=1:offset=41[V14]",
          "[V14][15]xfade=transition=slideup:duration=1:offset=44[V15]",
          "[V15][16]xfade=transition=slidedown:duration=1:offset=47[V16]",
          "[V16][17]xfade=transition=slideright:duration=1:offset=50[V17]",
          "[V17][18]xfade=transition=slideleft:duration=1:offset=53[V18]",
          "[V18][19]xfade=transition=slideup:duration=1:offset=56",
        ])

        .on("start", () => {
          console.log("starting");
        })
        .on("end", () => {
          Fs.rmSync(pics, { recursive: true });
          resolve();
        })
        .on("error", (error) => {
          Fs.rmSync(pics, { recursive: true });
          console.log(error);
        })
        .outputOptions(["-c:v libx264", "-r 30", "-pix_fmt yuv420p"])
        .output("out.mp4")
        .run();
    } catch (e) {
      Fs.rmSync(pics, { recursive: true });
      console.log(e);
    }
  });
}
