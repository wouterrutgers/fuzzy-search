const chai = require('./../node_modules/chai/chai');
const expect = chai.expect;
const Helper = require('./../src/Helper');
const FuzzySearch = require('./../dist/FuzzySearch');

describe('Fuzzy', function () {
  describe('search', function () {
    it('should return an error when called as a function', function () {
      let catched = false;

      try {
        FuzzySearch();
      } catch (Exception) {
        expect(Exception.message).to.contain('Cannot call a class as a function');
        catched = true;
      }

      if (! catched) {
        throw 'FuzzySearch should throw an error when called as a function';
      }
    });

    it('should return an error when searching without items', function () {
      expect(function () {
        new FuzzySearch();
      }).to.throw('We need an array containing the search list');
    });

    it('should return strings matching "qwe"', function () {
      var list = ['test', 'again', 'word', 'something', 'qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething'];
      var expectedOutput = ['qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething'];

      var fuzzy = new FuzzySearch(list);

      expect(expectedOutput).to.eql(fuzzy.search('qwe'));
    });

    it('should return strings matching "x"', function () {
      var list = ['x', 'xx', 'xxx', 't', 'f'];
      var expectedOutput = ['x', 'xx', 'xxx'];

      var fuzzy = new FuzzySearch(list);

      expect(expectedOutput).to.eql(fuzzy.search('x'));
    });

    it('should search in keys', function () {
      var list = [
        {
          name: 'Betania Ivana Besoli Leiten',
          location: 'El Salvador',
        },
        {
          name: 'Alexandría DCastillo Gayubas',
          location: 'Bolivia',
        },
      ];
      var expectedOutput = [
        {
          name: 'Alexandría DCastillo Gayubas',
          location: 'Bolivia',
        },
      ];

      var fuzzy = new FuzzySearch(list, ['name']);

      expect(expectedOutput).to.eql(fuzzy.search('als'));
    });

    it('should search in array keys', function () {
      var list = [
        {
          name: ['Irene', 'Maseras'],
          location: 'Colombia',
        },
        {
          name: ['Itziar', 'Julia', 'Pumarola', 'Duenas'],
          location: 'Chile',
        },
      ];
      var expectedOutput = [
        {
          name: ['Itziar', 'Julia', 'Pumarola', 'Duenas'],
          location: 'Chile',
        },
      ];

      var fuzzy = new FuzzySearch(list, ['name']);

      expect(expectedOutput).to.eql(fuzzy.search('itzi'));
    });

    it('should search in array keys containing objects', function () {
      var list = [
        {
          persons: [{ firstname: 'Patricia', lastname: 'Millaruelo' }, { firstname: 'Itziar', lastname: 'Julia' }],
        },
        {
          persons: [{ firstname: 'Alexandría', lastname: 'DCastillo' }, { firstname: 'Gayubas', lastname: 'Pumarola' }],
        },
      ];
      var expectedOutput = [
        {
          persons: [{ firstname: 'Patricia', lastname: 'Millaruelo' }, { firstname: 'Itziar', lastname: 'Julia' }],
        },
      ];

      var fuzzy = new FuzzySearch(list, ['persons.firstname']);

      expect(expectedOutput).to.eql(fuzzy.search('tzia'));
    });

    it('should allow to search case sensitive', function () {
      var list = ['Patricia', 'Millaruelo', 'Itziar', 'Julia'];
      var expectedOutput = [];

      var fuzzy = new FuzzySearch(list, [], {
        caseSensitive: true,
      });

      expect(expectedOutput).to.eql(fuzzy.search('mill'));
    });

    it('should return the whole list with an empty query string', function () {
      var list = ['Patricia', 'Millaruelo', 'Itziar', 'Julia'];

      var fuzzy = new FuzzySearch(list);

      expect(list).to.eql(fuzzy.search());
    });

    it('should not match repeating letters', function () {
      var list = ['long string', 'string'];
      var expectedOutput = [];

      var fuzzy = new FuzzySearch(list);

      expect(expectedOutput).to.eql(fuzzy.search('looooooong string'));
    });

    it('should allow sorting', function () {
      var list = ['a______b______c', 'a__b__c', 'abc'];
      var expectedOutput = ['abc', 'a__b__c', 'a______b______c'];

      var fuzzy = new FuzzySearch(list, [], {
        sort: true,
      });

      expect(expectedOutput).to.eql(fuzzy.search('abc'));
    });

    it('should boost score if query matches item exactly', function () {
      var list = ['prolog', 'rust', 'r', 'ruby'];
      var expectedOutput = ['r', 'rust', 'ruby', 'prolog'];

      var fuzzy = new FuzzySearch(list, [], {
        sort: true,
      });

      expect(expectedOutput).to.eql(fuzzy.search('r'));
    });
  });

  describe('getDescendantProperty', function () {
    it('should allow for deep key search', function () {
      var object = {
        level1: {
          level2: [
            {
              level3: 'NL',
            },
            {
              level3: 'EN',
            },
          ],
        },
      };
      var expectedOutput = ['NL', 'EN'];

      expect(expectedOutput).to.eql(Helper.getDescendantProperty(object, 'level1.level2.level3'));
    });
  });
});
