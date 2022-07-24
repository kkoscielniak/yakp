# Yet Another Kindle Parser

Parses Kindle Highlights from exported HTML file to JSON.

## Installation

```sh
npm install yakp
```

or

```sh
yarn add yakp
```

## Usage

```ts
import { Yakp } from 'yakp';

const yakp = new Yakp(stringifiedHtml);
const parsedNotebook = yakp.parse();
```
