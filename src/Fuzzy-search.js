export default class FuzzySearch {
  constructor(list = [], keys = [], options = {}) {
    if (list.length == 0) {
      throw new Error('We need an array containing the search list');
    }

    this.list = list;
    this.keys = keys;
    this.options = FuzzySearch.extend({
      caseSensitive: false,
    }, options);
  }

  search(query = '') {
    let results = [];

    for (let x = 0; x < this.list.length; x++) {
      let item = this.list[x];

      if (this.keys.length == 0 && FuzzySearch.isMatch(item, query, this.options.caseSensitive)) {
        results.push(item);
      } else {
        for (let y = 0; y < this.keys.length; y++) {
          let propertyValues = FuzzySearch.getDescendantProperty(item, this.keys[y]);
          let found = false;

          for (let z = 0; z < propertyValues.length; z++) {
            if (FuzzySearch.isMatch(propertyValues[z], query, this.options.caseSensitive)) {
              results.push(item);
              found = true;

              break;
            }
          }

          if (found) {
            break;
          }
        }
      }
    }

    return results;
  }

  static extend(...objects) {
    let output = {};

    for (let i = 1; i < objects.length; i++) {
      let object = objects[i];

      if (!object) {
        continue;
      }

      for (let key in object) {
        if (object.hasOwnProperty(key)) {
          if (typeof object[key] === 'object') {
            output[key] = FuzzySearch.deepExtend(output[key], object[key]);
          } else {
            output[key] = object[key];
          }
        }
      }
    }

    return output;
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
    let regexp = new RegExp(query.split('').map(letter => letter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")).join('.*?'), !caseSensitive ? 'i' : '');

    if (regexp.test(item)) {
      return true;
    }

    return false;
  }
}
