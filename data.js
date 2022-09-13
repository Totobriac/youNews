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
					if (articList.length < 20) {
						articList.push({
							"slug": slug,
							"link": link,
							"picLink": null,
						})
					} else {
						resolve();
					}
				});
			})
	})
}

const src = article =>
	new Promise(resolve =>
		axios.get(article.link)
			.then((response) => {
				var html = response.data;
				var $ = cheerio.load(html);
				var pic = $(".fig-media-photo");
				var fullString = pic.attr("srcset");
				if (fullString) {
					var picUrl = fullString.split(" ")[0];
					article.picLink = picUrl;
				}
				resolve();
			})
	)

const getAllSrc = async () => {
	for (article of articList) {
		var picSrc = await src(article);
	}
}


async function getData() {
	await getSlugUrl();
	await getAllSrc();
	return articList;
}

module.exports.getData = getData;