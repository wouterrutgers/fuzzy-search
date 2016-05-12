class FuzzySearch {
  constructor(list = [], keys = [], options = {}) {
    if (list.length == 0) {
      throw new Error('We need an array containing the search list');
    }

    this.list = list;
    this.keys = keys;
    this.options = FuzzySearch.extend({
      caseSensitive: false,
      sort: false,
    }, options);
  }

  search(query = '') {
    let results = [];

    if (query == '') {
      return this.list;
    }

    for (let x = 0; x < this.list.length; x++) {
      let item = this.list[x];

      if (this.keys.length == 0) {
        let score = FuzzySearch.isMatch(item, query, this.options.caseSensitive);

        if (score) {
          results.push({
            item,
            score,
          });
        }
      } else {
        keysLoop: for (let y = 0; y < this.keys.length; y++) {
          let propertyValues = FuzzySearch.getDescendantProperty(item, this.keys[y]);

          for (let z = 0; z < propertyValues.length; z++) {
            let score = FuzzySearch.isMatch(propertyValues[z], query, this.options.caseSensitive);

            if (score) {
              results.push({
                item,
                score,
              });

              break keysLoop;
            }
          }
        }
      }
    }

    if (this.options.sort) {
      results.sort((a, b) => {
        return a.score - b.score;
      });
    }

    return results.map((result) => {
      return result.item;
    });
  }

  static extend(...objects) {
    let target = {};

    for (let x = 0; x < objects.length; x++) {
      let object = objects[x];

      for (let property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
          if (Object.prototype.toString.call(object[property]) === '[object Object]') {
            target[property] = FuzzySearch.extend(target[property], object[property]);
          } else {
            target[property] = object[property];
          }
        }
      }
    }

    return target;
  }

  static getDescendantProperty(object, path, list = []) {
    let firstSegment;
    let remaining;
    let dotIndex;
    let value;
    let index;
    let length;

    if (!path) {
      list.push(object)
    } else {
      dotIndex = path.indexOf('.')

      if (dotIndex !== -1) {
        firstSegment = path.slice(0, dotIndex)
        remaining = path.slice(dotIndex + 1)
      } else {
        firstSegment = path
      }

      value = object[firstSegment]
      if (value !== null && value !== undefined) {
        if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
          list.push(value)
        } else if (Object.prototype.toString.call(value) === '[object Array]') {
          for (index = 0, length = value.length; index < length; index++) {
            FuzzySearch.getDescendantProperty(value[index], remaining, list)
          }
        } else if (remaining) {
          FuzzySearch.getDescendantProperty(value, remaining, list)
        }
      }
    }

    return list
  }

  static isMatch(item, query, caseSensitive) {
    if (!caseSensitive) {
      item = item.toLocaleLowerCase();
      query = query.toLocaleLowerCase();
    }

    let index = 0;
    let indexes = [];
    let letters = query.split('');

    for (let x = 0; x < letters.length; x++) {
      let letter = letters[x];

      index = item.indexOf(letter, index);

      if (index == -1) {
        return false;
      }

      indexes.push(index);

      index++;
    }

    let score = 0;

    for (let x = 0; x < indexes.length; x++) {
      if (x != indexes.length - 1) {
        score += indexes[x + 1] - indexes[x];
      }
    }

    return score;
  }
}
