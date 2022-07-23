const parse = require("node-html-parser").parse;
const fs = require("fs");

const file = fs.readFileSync("./example.html", { encoding: "utf8", flag: "r" });

const root = parse(file);

const title = root
  .querySelector(".bookTitle")
  .removeWhitespace()
  .textContent.trimStart();

console.log(title);
