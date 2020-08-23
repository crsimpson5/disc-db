const disc = require("../../server/models/Disc");

const fetch = require("node-fetch");
const URL = "http://localhost:9000/api";

const update = {
  query: {
    type: "fairway driver"
  },
  update: {
    $set: {
      type: "FAIRWAY DRIVER"
    }
  }
};

function updateDocs(body) {
  return new Promise((resolve, reject) => {
    fetch(URL, {
        method: "put",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
}

updateDocs(update)
  .then(res => console.log(`Documents updated: ${res.nModified}`))
  .catch(err => console.error(err));

disc
  .find({})
  .then(docs => {
    console.log("docs", docs);
    docs.forEach(doc => {
      doc.type = disc.type.toLowerCase();
      
      disc.save(doc);
    });
  })
  .catch(err => console.error(err));
