const Fs = require("fs");
var logger

var writeLine = (line) => {
  logger.write(`\n${line}`);
};

exports.createText = async (data) => {
  Fs.rmSync("./log.srt", { recursive: true });
  logger = Fs.createWriteStream("log.srt", {
    flags: "a",
  });
  await textCreation(data);
  console.log("subs created");
  return;
};

var textCreation = (data) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < data.length; i++) {
      var secs = i * 3;
      writeLine(i);
      writeLine(`00:00:${secs},500 --> 00:00:${secs + 2},000`);
      writeLine(data[i].slug);
      writeLine("");      
    }
    logger.end();
    resolve();
  });
};
