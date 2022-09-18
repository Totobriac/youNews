const Fs = require("fs");

var logger = Fs.createWriteStream("log.srt", {
  flags: "a",
});

var writeLine = (line) => {
  logger.write(`\n${line}`);
};

exports.createText = async (data) => {
  await textCreation(data);

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
