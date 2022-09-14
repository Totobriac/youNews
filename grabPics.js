const Fs = require('fs');
const Os = require('os');
const Path = require('path');
const Axios = require("axios");

let tmpDir;
const appPrefix = 'you_news';
tmpDir = Fs.mkdtempSync(Path.join(Os.tmpdir(), appPrefix));
var index = 0;

exports.grabPics = async (data) => {
  await downLoadPics(data);
  
  return tmpDir;
}

async function downLoadPics(data) {
  await downAll(data);
}

const downAll = async (data) => {
  for (dt of data) {
    index++;
    var downPic = await downloadImage(dt);
  };
}

async function downloadImage(dt) {
  const url = dt.link;
  const path = Path.resolve(tmpDir, index + '.jpg');
  const writer = Fs.createWriteStream(path);

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
  
}