import { parse, HTMLElement } from 'node-html-parser';
import { KindleNotebook } from '../../models/kindle';

enum QuerySelectorsEnum {
  TITLE = 'div.bookTitle',
  AUTHORS = 'div.authors',
}

export default class HtmlParser {
  #html: HTMLElement;

  constructor(htmlContent: string) {
    this.#html = parse(htmlContent);
  }

  private parseMetadata(querySelector: QuerySelectorsEnum): string {
    return this.#html
      .querySelector(querySelector)
      ?.removeWhitespace()
      .textContent.trimStart()
      .trimEnd()!;
  }

  parseHtml(): KindleNotebook {
    let result: KindleNotebook = {
      title: this.parseMetadata(QuerySelectorsEnum.TITLE),
      authors: this.parseMetadata(QuerySelectorsEnum.AUTHORS),
    };

    return result;
  }
}
