# Fuzzy search

*Simple lightweight Fuzzy Search library written in JavaScript, with zero dependencies!*

[![Travis](https://img.shields.io/travis/wouter2203/fuzzy-search/master.svg)](https://travis-ci.org/wouter2203/fuzzy-search)
[![npm](https://img.shields.io/npm/v/fuzzy-search.svg)](https://www.npmjs.com/package/fuzzy-search)
[![npm](https://img.shields.io/npm/dm/fuzzy-search.svg)](https://www.npmjs.com/package/fuzzy-search)
[![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NUA68T5TCC2BN)

## Installation

> Using npm

`npm install fuzzy-search --save`

> Using `<script>`

`<script src="FuzzySearch.js"></script>`

## Quick start guide
```javascript
// This can be excluded when loaded via <script>
import FuzzySearch from 'fuzzy-search'; // Or: var FuzzySearch = require('fuzzy-search');

const people = [{
  name: {
    firstName: 'Jesse',
    lastName: 'Bowen',
  },
  state: 'Seattle',
}];

const searcher = new FuzzySearch(people, ['name.firstName', 'state'], {
  caseSensitive: true,
});
const result = searcher.search('ess');
```

## Documentation
```javascript
const searcher = new FuzzySearch(<haystack>, [keys], [options]);
const result = searcher.search(<needle>);
```

**haystack** *(type: `Array`)*

Array of objects containing the search list.

---

**[keys]** *(type: `Array`, default: `[]`)*

List of properties that will be searched. This also supports nested properties.

---

**[options]** *(type: `Object`)*

Object with options that will configure the search. Scroll/Swipe down to see more information on what options are available.

---

**\<needle\>** *(type: `String`, default: `''`)*

The string to Fuzzy Search on.

### Options
**caseSensitive** *(type: `Boolean`, default: `false`)*

Indicates whether comparisons should be case sensitive.

**sort** *(type: `Boolean`, default: `false`)*

When `true` it will sort the results by best match (when searching for `abc` in the search set `['a__b__c', 'abc']` it would return `abc` as the first result).

When `false` it will return the results in the original order.
