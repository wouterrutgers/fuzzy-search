'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fuzzy = function () {
  function Fuzzy() {
    var list = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var keys = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    _classCallCheck(this, Fuzzy);

    if (list.length == 0) {
      throw new Error('We need an array containing the search list');
    }

    this.list = list;
    this.keys = keys;
  }

  _createClass(Fuzzy, [{
    key: 'search',
    value: function search() {
      var query = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

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
  }, {
    key: 'getDescendantProperty',
    value: function getDescendantProperty(object, path) {
      var list = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      var firstSegment;
      var remaining;
      var dotIndex;
      var value;
      var index;
      var length;

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
              this.getDescendantProperty(value[index], remaining, list);
            }
          } else if (remaining) {
            this.getDescendantProperty(value, remaining, list);
          }
        }
      }

      return list;
    }
  }, {
    key: 'isMatch',
    value: function isMatch(item, query) {
      var regexp = new RegExp(query.split('').map(function (letter) {
        return letter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      }).join('.*?'), 'i');

      if (regexp.test(item)) {
        return true;
      }

      return false;
    }
  }]);

  return Fuzzy;
}();

exports.default = Fuzzy;
//# sourceMappingURL=fuzzy-search.js.map
