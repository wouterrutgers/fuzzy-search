import Helper from './Helper';

export default class FuzzySearch {
  constructor(haystack = [], keys = [], options = {}) {
    if (haystack.length === 0) {
      throw new Error('We need an array containing the search list');
    }

    this.haystack = haystack;
    this.keys = keys;
    this.options = Object.assign({
      caseSensitive: false,
      sort: false,
    }, options);
  }

  search(query = '') {
    if (query === '') {
      return this.haystack;
    }

    const results = [];

    for (let i = 0; i < this.haystack.length; i++) {
      const item = this.haystack[i];

      if (this.keys.length === 0) {
        const score = FuzzySearch.isMatch(item, query, this.options.caseSensitive);

        if (score) {
          results.push({ item, score });
        }
      } else {
        for (let y = 0; y < this.keys.length; y++) {
          const propertyValues = Helper.getDescendantProperty(item, this.keys[y]);

          let found = false;

          for (let z = 0; z < propertyValues.length; z++) {
            const score = FuzzySearch.isMatch(propertyValues[z], query, this.options.caseSensitive);

            if (score) {
              found = true;

              results.push({ item, score });

              break;
            }
          }

          if (found) {
            break;
          }
        }
      }
    }

    if (this.options.sort) {
      results.sort((a, b) => a.score - b.score);
    }

    return results.map(result => result.item);
  }

  static isMatch(item, query, caseSensitive) {
    if (! caseSensitive) {
      item = item.toLocaleLowerCase();
      query = query.toLocaleLowerCase();
    }

    const letters = query.split('');
    const indexes = [];

    let index = 0;

    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];

      index = item.indexOf(letter, index);

      if (index === -1) {
        return false;
      }

      indexes.push(index);

      index++;
    }

    if (item === query) {
      return 1;
    }

    return indexes.reduce((a, b) => a + b, 2);
  }
}
