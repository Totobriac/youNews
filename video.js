const Fs = require('fs');
const Os = require('os');
const Path = require('path');
const Axios = require("axios");

let tmpDir;
const appPrefix = 'my-app';

exports.createVid = function (data) {
  try {
    tmpDir = Fs.mkdtempSync(Path.join(Os.tmpdir(), appPrefix));

    async function downloadImage() {
      const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
      const path = Path.resolve(tmpDir, 'code.jpg')
      const writer = Fs.createWriteStream(path)
  
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

    downloadImage();
  }
  catch {
  }
  /*finally {
    try {
      if (tmpDir) {
        fs.rmSync(tmpDir, { recursive: true });
      }
    }
    catch (e) {
      console.error(`An error has occurred while removing the temp folder at ${tmpDir}. Please remove it manually. Error: ${e}`);
    }
  }*/

  console.log(data);
  console.log(tmpDir);
};