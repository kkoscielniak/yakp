import { parse } from "node-html-parser";
const fs = require("fs");

const file = fs.readFileSync("./example.html", { encoding: "utf8", flag: "r" });

const root = parse(file!);

if (!root) {
  process.exit();
}

const title = root?.querySelector(".bookTitle")?.removeWhitespace()
  .textContent.trimStart();

console.log(title);
