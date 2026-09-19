import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import vm from 'node:vm';
import ModuleFuzzySearch from '../dist/FuzzySearch.mjs';

const require = createRequire(import.meta.url);
const CommonJSFuzzySearch = require('../');
const browser = vm.createContext({});

vm.runInContext(readFileSync(new URL('../dist/FuzzySearch.js', import.meta.url), 'utf8'), browser);

for (const FuzzySearch of [ModuleFuzzySearch, CommonJSFuzzySearch, browser.FuzzySearch]) {
  assert.deepEqual(Array.from(new FuzzySearch(['Jesse', 'Sam']).search('ess')), ['Jesse']);
}
