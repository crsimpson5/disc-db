const fetch = require("node-fetch");
const { getDynamicDiscs } = require("./dynamic")

const URL = "http://localhost:9000/api";
const dynamicDiscsUrls = [
  "https://www.dynamicdiscs.com/distance-drivers_a/410.htm",
  "https://www.dynamicdiscs.com/fairway-drivers_a/411.htm",
  "https://www.dynamicdiscs.com/midranges_a/412.htm",
  "https://www.dynamicdiscs.com/putters_a/413.htm"
];

function addToDb(discArr) {
  return new Promise((resolve, reject) => {
    fetch(URL, {
        method: "post",
        body: JSON.stringify(discArr),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
}

function getData(urls) {
  const promises = [];

  urls.forEach(url => {
    promises.push(getDynamicDiscs(url));
  });

  return Promise.all(promises);
}

function main() {
  getData(dynamicDiscsUrls)
    .then(values => {
      let discs = [].concat(...values);
      
      addToDb(discs)
        .then(res => console.log(`Documents inserted: ${res.length}`))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}

main();
