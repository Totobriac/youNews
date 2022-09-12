const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

var articList = [];

axios.get("https://www.lefigaro.fr/flash-actu")
  .then((response) => {
    var html = response.data;
    var $ = cheerio.load(html);

    var articles = $(".fig-flash__item");

    articles.each(function (i, el) {
      var slug = ($(el).find("h2").text()).trim();
      var link = ($(el).find("a").attr("href"));

      articList.push({
        "slug": slug,
        "link": link
      })
    });
    console.log(articList);
  })
