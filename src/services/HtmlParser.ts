import { parse, HTMLElement } from 'node-html-parser';
import { ClassesEnum, Highlight, Notebook, QuerySelectorsEnum } from '../models/kindle';



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

  parse(): Notebook {
    let notebook: Notebook = {
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
