export interface KindleNotebook {
  title: string;
  authors: string; // TODO: Make it array of strings
  highlights: Highlight[];
}

export interface Highlight {
  color: string | null;
  location: number;
  text: string;
}

export enum QuerySelectorsEnum {
  TITLE = 'div.bookTitle',
  AUTHORS = 'div.authors',
}

export enum ClassesEnum {
  NOTE_HEADING = 'noteHeading',
  NOTE_TEXT = 'noteText',
}

// TODO: ColorsEnum
