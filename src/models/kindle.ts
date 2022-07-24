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
