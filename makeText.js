// This will contain all the imports that are to be used in this file
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

// This takes care of generating the texts that will be displayed in the terminal
function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}


// This will read the file and then call the generateText function if successful
function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}


// This works very simillarly to the previous makeText() function
// but this one will do it with a URL request
async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data)
}


// This will get the input that was given when the node file was called
let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}