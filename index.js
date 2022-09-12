const axios = require("axios");
const cheerio = require("cheerio");

var articList = [];

function getSlugUrl() {
  return new Promise((resolve) => {
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
            "link": link,
            "picLink": null,
          })
        });
        resolve();
      })
    }
  )
}


async function getPicUrl() {
  await getSlugUrl();
  for (let i = 0; i < articList.length; i++) {
    
    axios.get(articList[i].link)
      .then((response) => {        
        var html = response.data;
        var $ = cheerio.load(html);        
        var pic = $(".fig-media__container");
        console.log(pic.text().split("<img srcset="));
        
      })
  }  
}

getPicUrl();