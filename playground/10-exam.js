//age.js
/*
const https = require("https");

https.get("https://coderbyte.com/api/challenges/json/age-counting", (resp) => {
  // let { statusCode } = resp;
  // let contentType = resp.headers["content-type"];
  resp.setEncoding("utf-8");
  let data = "";

  // parse json data here...
  resp.on("data", (d) => {
    data += [d];
    console.log(data);
  });

  resp.on("end", () => {
    let parsedData = data
      .split(",")
      .filter((data) => !data.indexOf(" age="))
      .map((data) => data.replace(" age=", ""))
      .map((data) => parseInt(data))
      .filter((data) => {
        return data >= 50;
      }).length;
    console.log(parsedData);
  });
  resp.on("error", (e) => {
    console.log("error", e);
  });

  //console.log(resp);
});
*/
//json-cleaning.js
/*
var http = require("http");

var https = require("https");

function isEmpty(value) {
  if (value === "N/A" || value === "-" || value === "") return true;
  return false;
}

https.get("https://coderbyte.com/api/challenges/json/json-cleaning", (resp) => {
  // let data = "";

  let data = "";
  resp.on("data", function (chunk) {
    data += chunk;
  });

  resp.on("end", function () {
    data = JSON.parse(data);
    // your code here if you want to use the results !
    let newObj = {};
    Object.keys(data).forEach((key) => {
      const item = data[key];
      if (typeof item === "string") {
        if (!isEmpty(item)) newObj[key] = item;
      } else if (item instanceof Array) {
        newObj[key] = item.filter((value) => !isEmpty(value));
      } else if (typeof item === "object") {
        let tmpObj = {};
        Object.keys(item).forEach((itemKey) => {
          if (!isEmpty(item[itemKey])) tmpObj[itemKey] = item[itemKey];
        });
        newObj[key] = tmpObj;
      } else newObj[key] = item;
    });
    console.log(JSON.stringify(newObj));
  });
});
*/
// ----------
//create a server object:
// http
//   .createServer(function (req, res) {
//     res.write("s");
//     res.end(); //end the response
//   })
//   .listen(8080); //the server object listens on port 8080

let obj = {
  name: {
    first: "Daniel",
    middle: "N/A",
    last: "Smith",
    innerObject: {
      prop1: "random value",
      prop2: null,
      prop3: "N/A",
      prop4: {},
    },
  },
  age: 45,
};

const recurse = (data) => {
  for (let key in data) {
    if (data[key] instanceof Object) {
      if (Object.keys(data[key]).length == 0) {
        delete data[key];
      } else {
        recurse(data[key]);
      }
    } else if (
      data[key] === "null" ||
      data[key] == "N/A" ||
      data[key] === null ||
      data[key] === "-" ||
      typeof data[key] === "undefined" ||
      (data[key] instanceof Object && Object.keys(data[key]).length == 0)
    ) {
      delete data[key];
    }
  }
  return data;
};

let newobj = recurse(obj);
console.log(newobj);
