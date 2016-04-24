# Fuzzy search

[![Travis](https://img.shields.io/travis/wouter2203/fuzzy-search.svg?maxAge=2592000)](https://travis-ci.org/wouter2203/fuzzy-search)
[![npm](https://img.shields.io/npm/v/fuzzy-search.svg?maxAge=2592000)](https://www.npmjs.com/package/fuzzy-search)
[![npm](https://img.shields.io/npm/dm/fuzzy-search.svg?maxAge=2592000)](https://www.npmjs.com/package/fuzzy-search)
[![Coveralls](https://img.shields.io/coveralls/wouter2203/fuzzy-search.svg?maxAge=2592000)](https://coveralls.io/github/wouter2203/fuzzy-search)

> Simple fuzzy search

## Installation

> Using npm

`npm install fuzzy-search --save`

> Using `<script>`

`<script src="fuzzy-search.min.js"></script>`

## Quick start guide
```js
// This can be excluded when loaded via <script>
import FuzzySearch from 'fuzzy-search'; // Or: var FuzzySearch = require('fuzzy-search');

var people = [{
  name: {
    firstName: 'Jesse',
    lastName: 'Bowen',
  },
  state: 'Seattle',
}];

var fuzzy = new FuzzySearch(people, ['name.firstName', 'state'], {
  caseSensitive: true,
});
var result = fuzzy.search('ess');
```

## Documentation
```js
var fuzzy = new FuzzySearch(<haystack>, [keys], [options]);
var result = fuzzy.search(<needle>);
```

### `<hackstack>`
(Array) Array of objects containing the search list

### `[keys]`
(Array) List of properties that will be searched. This also supports nested properties.

### `[options]`
(Object) Object with options that will configure the search

### `<needle>`
(String) The string to search on 

## Options
**caseSensitive** (_type_: `Boolean`)

Indicates whether comparisons should be case sensitive.
