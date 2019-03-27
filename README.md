# turndown-plugin-scrapbox

[Turndown](https://github.com/domchristie/turndown) plugin which provides wild conversion between an HTML and text in [Scrapbox](https://scrapbox.io/) [syntax](https://scrapbox.io/help/Syntax).

## Install

Install with [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/):

```console
$ npm i @0x6b/turndown-plugin-scrapbox # or
$ yarn add @0x6b/turndown-plugin-scrapbox
```

## Usage

```js
const TurndownService = require("turndown");
const scrapboxPlugin = require("turndown-plugin-scrapbox");

const turndownService = new TurndownService();
turndownService.use(scrapboxPlugin);

const text = turndownService.turndown("<h1>Welcome</h1>\n<em>Hello</em> <a href='https://scrapbox.io'>Scrapbox</a>");
// Result should be:
//   [******* Welcome]
//
//   [/ Hello] [Scrapbox https://scrapbox.io]
```

## Build

```console
$ npm install && npm run build # or
$ yarn && yarn build
```

## Test

```console
$ npm test # or
$ yarn test
```

## License

MIT. See [LICENSE](LICENSE) for details.

## Acknowledgements

* [Turndown](https://github.com/domchristie/turndown), which does all the heavy lifting
* [turndown-plugin-gfm](https://github.com/domchristie/turndown-plugin-gfm)
