const TurndownService = require("turndown");
const scrapboxPlugin = require("../dist/turndown-plugin-scrapbox");
const { readFileSync } = require("fs");
const { join } = require("path");
const assert = require("assert");

const turndownService = new TurndownService();
turndownService.use(scrapboxPlugin);

const actual = turndownService.turndown(readFileSync(join(__dirname, "test.html")).toString());
const expected = readFileSync(join(__dirname, "test.sb")).toString();
assert.strictEqual(actual, expected);
