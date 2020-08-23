const cheerio = require("cheerio");
const request = require("request");

module.exports = { 
  getDynamicDiscs: function(url) {
    return new Promise((resolve, reject) => {
      request({
        method: "GET",
        url
      }, (err, res, body) => {
        if (err) reject(err);

        const $ = cheerio.load(body);
        let elements = $("div .col-xs-12", "td").children("a").children("h4").parent().siblings("p").parent();
        const discData = [];
        const discs = [];

        elements.each((index, e) => {
          discData.push({
            fullName: $(e).children("a").children("h4").text(),
            imgSrc: $(e).find("img").attr("src"),
            stats: $(e).children("p").text().slice(0, $(e).children("p").text().search(/[A-Za-z]/)).match(/[-]?[0-9]{1,2}([.][0-9])?/g),
            description: $(e).children("p").text().slice($(e).children("p").text().search(/[A-Za-z]/))
          });
        });

        discData.forEach(disc => {
          let name = "";
          let manufacturer = "";

          const manufacturerArr = ["LATITUDE 64", "DYNAMIC DISCS", "WESTSIDE DISCS"];

          disc.stats = disc.stats.map(disc => Number(disc));

          for (manufac of manufacturerArr) {
            if (disc.fullName.includes(manufac)) {
              name = disc.fullName.slice(manufac.length).trim();
              manufacturer = manufac;
              break;
            }
          }

          discs.push({
            name,
            manufacturer,
            description: disc.description,
            imgSrc: disc.imgSrc.slice(disc.imgSrc.lastIndexOf("/") + 1),
            speed: disc.stats[0],
            glide: disc.stats[1],
            turn: disc.stats[2],
            fade: disc.stats[3]
          });
        });
        resolve(discs);
      });
    });
  }
};
