import Helper from './Helper';

module.exports = class FuzzySearch {
  constructor(list = [], keys = [], options = {}) {
    if (list.length == 0) {
      throw new Error('We need an array containing the search list');
    }

    this.list = list;
    this.keys = keys;
    this.options = Helper.extend({
      caseSensitive: false,
      sort: false,
    }, options);
  }

  search(query = '') {
    if (query == '') {
      return this.list;
    }

    let results = [];

    for (let i = 0; i < this.list.length; i++) {
      const item = this.list[i];

      if (this.keys.length == 0) {
        const score = this.isMatch(item, query, this.options.caseSensitive);

        if (score) {
          results.push({ item, score });
        }
      } else {
        keysLoop: for (let y = 0; y < this.keys.length; y++) {
          const propertyValues = Helper.getDescendantProperty(item, this.keys[y]);

          for (let z = 0; z < propertyValues.length; z++) {
            const score = this.isMatch(propertyValues[z], query, this.options.caseSensitive);

            if (score) {
              results.push({ item, score });

              break keysLoop;
            }
          }
        }
      }
    }

    if (this.options.sort) {
      results.sort((a, b) => a.score - b.score);
    }

    return results.map(result =>result.item);
  }

  isMatch(item, query, caseSensitive) {
    if (!caseSensitive) {
      item = item.toLocaleLowerCase();
      query = query.toLocaleLowerCase();
    }

    const letters = query.split('');

    let index = 0;
    let indexes = [];

    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];

      index = item.indexOf(letter, index);

      if (index == -1) {
        return false;
      }

      indexes.push(index);

      index++;
    }

    let score = 1;

    for (let i = 0; i < indexes.length; i++) {
      if (i != indexes.length - 1) {
        score += indexes[i + 1] - indexes[i];
      }
    }

    return score;
  }
}
