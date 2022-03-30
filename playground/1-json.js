const fs = require("fs");
const book = {
  title: "Ego is the Enemy",
  author: "Ryan Holiday",
};
const bookjson = JSON.stringify(book); //conv obj to json string
fs.writeFileSync('1-json.json',bookjson);