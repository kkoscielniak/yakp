import { parse } from 'node-html-parser';
import HtmlParser from './services/HtmlParser';
const fs = require('fs');

const file = fs.readFileSync('./example.html', { encoding: 'utf8', flag: 'r' });

const root = parse(file!);

if (!root) {
  process.exit();
}

const notebookParser = new HtmlParser(file);
const parsedNotebook = notebookParser.parseHtml();
console.log(parsedNotebook);
