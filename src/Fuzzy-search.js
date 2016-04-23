export default class Fuzzy {
  constructor(list = [], keys = []) {
    this.list = list;
    this.keys = keys;
  }

  search(query = '') {
    var results = [];

    for (var x = 0; x < this.list.length; x++) {
      var item = this.list[x];

      if (this.keys.length == 0 && this.isMatch(item, query)) {
        results.push(item);
      } else {
        for (var y = 0; y < this.keys.length; y++) {
          var propertyValues = this.getDescendantProperty(item, this.keys[y]);
          var found = false;

          for (var z = 0; z < propertyValues.length; z++) {
            if (this.isMatch(propertyValues[z], query)) {
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

  getDescendantProperty(object, path, list = []) {
    var firstSegment;
    var remaining;
    var dotIndex;
    var value;
    var index;
    var length;

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
            this.getDescendantProperty(value[index], remaining, list)
          }
        } else if (remaining) {
          this.getDescendantProperty(value, remaining, list)
        }
      }
    }

    return list
  }

  isMatch(item, query) {
    var regexp = new RegExp(query.split('').map(letter => letter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")).join('.*?'), 'i');

    if (regexp.test(item)) {
      return true;
    }

    return false;
  }
}
