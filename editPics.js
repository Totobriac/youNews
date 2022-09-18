var Jimp = require("jimp");

exports.editPics = async (data) => {
  await editTheBack(data);
  console.log(data);
  await composePic(data);
  return;
};

var editTheBack = async (data) => {
  for (let i = 1; i < 21; i++) {
    var eff = await Jimp.read(data + "/" + i + ".jpg")
      .then((image) => {
        image
          .crop(241, 0, 222, 396)
          .fade(0.75)
          .gaussian(3)
          .grayscale()
          .resize(704, Jimp.AUTO)
          .write(data + "/" + i + "back.png");
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

var backb = Jimp.read("./black_back.png").then((resp) => {
  return resp;
});

var composePic = async (data) => {
  for (let i = 1; i < 21; i++) {  
    var eff = await Jimp.read(data + "/" + i + "back.png")
      .then((back) => {
        Jimp.read(data + "/" + i + ".jpg")
          .then((front) => {
            back.composite(front, 0, 700);
          })
          .then((resp) => {
            Jimp.read("./black_back.png")
              .then((blackback) => {
                blackback
                  .composite(back, 0, 0)
                  .write(data + "/" + i + "final.png");
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }
};
