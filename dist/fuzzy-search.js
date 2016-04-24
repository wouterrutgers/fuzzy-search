;(function(root, factory) {
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.FuzzySearch = factory();
  }
}(this, function() {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FuzzySearch = function () {
  function FuzzySearch() {
    var list = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var keys = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, FuzzySearch);

    if (list.length == 0) {
      throw new Error('We need an array containing the search list');
    }

    this.list = list;
    this.keys = keys;
    this.options = FuzzySearch.extend({
      caseSensitive: false
    }, options);
  }

  _createClass(FuzzySearch, [{
    key: 'search',
    value: function search() {
      var query = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      var results = [];

      for (var x = 0; x < this.list.length; x++) {
        var item = this.list[x];

        if (this.keys.length == 0 && FuzzySearch.isMatch(item, query, this.options.caseSensitive)) {
          results.push(item);
        } else {
          for (var y = 0; y < this.keys.length; y++) {
            var propertyValues = FuzzySearch.getDescendantProperty(item, this.keys[y]);
            var found = false;

            for (var z = 0; z < propertyValues.length; z++) {
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
  }], [{
    key: 'extend',
    value: function extend() {
      var target = {};

      for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
        objects[_key] = arguments[_key];
      }

      for (var x = 0; x < objects.length; x++) {
        var object = objects[x];

        for (var property in object) {
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
  }, {
    key: 'getDescendantProperty',
    value: function getDescendantProperty(object, path) {
      var list = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      var firstSegment = void 0;
      var remaining = void 0;
      var dotIndex = void 0;
      var value = void 0;
      var index = void 0;
      var length = void 0;

      if (!path) {
        list.push(object);
      } else {
        dotIndex = path.indexOf('.');

        if (dotIndex !== -1) {
          firstSegment = path.slice(0, dotIndex);
          remaining = path.slice(dotIndex + 1);
        } else {
          firstSegment = path;
        }

        value = object[firstSegment];
        if (value !== null && value !== undefined) {
          if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
            list.push(value);
          } else if (Object.prototype.toString.call(value) === '[object Array]') {
            for (index = 0, length = value.length; index < length; index++) {
              FuzzySearch.getDescendantProperty(value[index], remaining, list);
            }
          } else if (remaining) {
            FuzzySearch.getDescendantProperty(value, remaining, list);
          }
        }
      }

      return list;
    }
  }, {
    key: 'isMatch',
    value: function isMatch(item, query, caseSensitive) {
      var regexp = new RegExp(query.split('').map(function (letter) {
        return letter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      }).join('.*?'), !caseSensitive ? 'i' : '');

      if (regexp.test(item)) {
        return true;
      }

      return false;
    }
  }]);

  return FuzzySearch;
}();
return FuzzySearch;
}));

//# sourceMappingURL=fuzzy-search.js.map
