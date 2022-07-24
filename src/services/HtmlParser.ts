import { parse, HTMLElement } from 'node-html-parser';
import { Highlight, KindleNotebook } from '../models/kindle';

enum QuerySelectorsEnum {
  TITLE = 'div.bookTitle',
  AUTHORS = 'div.authors',
}

enum ClassesEnum {
  NOTE_HEADING = 'noteHeading',
  NOTE_TEXT = 'noteText',
}

export default class HtmlParser {
  #html: HTMLElement;

  constructor(htmlContent: string) {
    this.#html = parse(htmlContent);
  }

  private parseMetadata(querySelector: QuerySelectorsEnum): string {
    return this.#html
      .querySelector(querySelector)!
      .removeWhitespace()
      .textContent.trim();
  }

  private getColorFromDiv(div: HTMLElement): string | null {
    const colorSpan = div.querySelector('span');

    if (!colorSpan) {
      return null;
    }

    return colorSpan.textContent.trim();
  }

  private getLocationFromDiv(div: HTMLElement): number {
    return Number(
      div.removeWhitespace().textContent.trim().match(/[0-9]/g)?.join('')
    );
  }

  private getNoteFromDiv(div: HTMLElement): string {
    return div.removeWhitespace().structuredText.trim();
  }

  parseHtml(): KindleNotebook {
    let notebook: KindleNotebook = {
      title: this.parseMetadata(QuerySelectorsEnum.TITLE),
      authors: this.parseMetadata(QuerySelectorsEnum.AUTHORS),
      highlights: [],
    };

    const divsToQuery = Object.values(ClassesEnum)
      .map((divClass) => `div.${divClass}`)
      .join(', ');

    const divs = this.#html.querySelectorAll(divsToQuery);

    let currentHighlight: Highlight | undefined;

    divs.forEach((div) => {
      if (div.classNames.includes(ClassesEnum.NOTE_HEADING)) {
        currentHighlight = {
          color: this.getColorFromDiv(div),
          location: this.getLocationFromDiv(div),
          text: '',
        };
      } else if (div.classNames.includes(ClassesEnum.NOTE_TEXT)) {
        currentHighlight!.text = this.getNoteFromDiv(div);
        notebook.highlights.push(currentHighlight!);
      }
    });

    return notebook;
  }
}
