const axios = require("axios");
const cheerio = require("cheerio");

var articList = [];
var articPicList = [];

function getSlugUrl() {
  return new Promise((resolve) => {
    axios.get("https://www.lefigaro.fr/flash-actu").then((response) => {
      var html = response.data;
      var $ = cheerio.load(html);
      var articles = $(".fig-flash__item");
      articles.each(function (i, el) {
        var slug = $(el).find("h2").text().trim();
        var link = $(el).find("a").attr("href");
        articList.push({
          slug: slug,
          link: link,
          picLink: null,
        });
      });
      resolve();
    });
  });
}

const src = (article) =>
  new Promise((resolve) =>
    axios.get(article.link).then((response) => {
      var html = response.data;
      var $ = cheerio.load(html);
      var pic = $(".fig-media-photo");
      var fullString = pic.attr("srcset");
      if (fullString) {
        var urls = fullString.split(" ");
        var picUrl = urls[urls.length - 2];
        articPicList.push({
          slug: article.slug,
          link: picUrl,
        });
      }
      resolve();
    })
  );

const getAllSrc = async () => {
  for (article of articList) {
    if (articPicList.length < 20) {
      var picSrc = await src(article);
    }
  }
};

async function getData() {
  await getSlugUrl();
  await getAllSrc();
  return articPicList;
}

module.exports.getData = getData;
