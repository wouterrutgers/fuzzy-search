(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FuzzySearch", [], factory);
	else if(typeof exports === 'object')
		exports["FuzzySearch"] = factory();
	else
		root["FuzzySearch"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Helper = __webpack_require__(1);
	
	var _Helper2 = _interopRequireDefault(_Helper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	module.exports = function () {
	  function FuzzySearch() {
	    var haystack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	    _classCallCheck(this, FuzzySearch);
	
	    if (haystack.length == 0) {
	      throw new Error('We need an array containing the search list');
	    }
	
	    this.haystack = haystack;
	    this.keys = keys;
	    this.options = _Helper2.default.extend({
	      caseSensitive: false,
	      sort: false
	    }, options);
	  }
	
	  _createClass(FuzzySearch, [{
	    key: 'search',
	    value: function search() {
	      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	      if (query == '') {
	        return this.haystack;
	      }
	
	      var results = [];
	
	      for (var i = 0; i < this.haystack.length; i++) {
	        var item = this.haystack[i];
	
	        if (this.keys.length == 0) {
	          var score = this.isMatch(item, query, this.options.caseSensitive);
	
	          if (score) {
	            results.push({ item: item, score: score });
	          }
	        } else {
	          keysLoop: for (var y = 0; y < this.keys.length; y++) {
	            var propertyValues = _Helper2.default.getDescendantProperty(item, this.keys[y]);
	
	            for (var z = 0; z < propertyValues.length; z++) {
	              var _score = this.isMatch(propertyValues[z], query, this.options.caseSensitive);
	
	              if (_score) {
	                results.push({ item: item, score: _score });
	
	                break keysLoop;
	              }
	            }
	          }
	        }
	      }
	
	      if (this.options.sort) {
	        results.sort(function (a, b) {
	          return a.score - b.score;
	        });
	      }
	
	      return results.map(function (result) {
	        return result.item;
	      });
	    }
	  }, {
	    key: 'isMatch',
	    value: function isMatch(item, query, caseSensitive) {
	      if (!caseSensitive) {
	        item = item.toLocaleLowerCase();
	        query = query.toLocaleLowerCase();
	      }
	
	      var letters = query.split('');
	
	      var index = 0;
	      var indexes = [];
	
	      for (var i = 0; i < letters.length; i++) {
	        var letter = letters[i];
	
	        index = item.indexOf(letter, index);
	
	        if (index == -1) {
	          return false;
	        }
	
	        indexes.push(index);
	
	        index++;
	      }
	
	      var score = 1;
	
	      for (var _i = 0; _i < indexes.length; _i++) {
	        if (_i != indexes.length - 1) {
	          score += indexes[_i + 1] - indexes[_i];
	        }
	      }
	
	      return score;
	    }
	  }]);
	
	  return FuzzySearch;
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Helper = function () {
	  function Helper() {
	    _classCallCheck(this, Helper);
	  }
	
	  _createClass(Helper, null, [{
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
	              target[property] = Helper.extend(target[property], object[property]);
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
	      var list = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	
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
	              Helper.getDescendantProperty(value[index], remaining, list);
	            }
	          } else if (remaining) {
	            Helper.getDescendantProperty(value, remaining, list);
	          }
	        }
	      }
	
	      return list;
	    }
	  }]);
	
	  return Helper;
	}();
	
	exports.default = Helper;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=FuzzySearch.js.map