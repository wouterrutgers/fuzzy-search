'use strict';

var FuzzySearch = require('./../dist/fuzzy-search');
var expect = require('chai').expect;

describe('Fuzzy', function() {
  describe('search', function() {
    it('should return an error when called as a function', function() {
      expect(FuzzySearch).to.throw('Cannot call a class as a function');
    });

    it('should return an error when searching without items', function() {
      expect(function() {
        new FuzzySearch();
      }).to.throw('We need an array containing the search list');
    });

    it('should return strings matching "qwe"', function() {
      var list = ['test', 'again', 'word', 'something', 'qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething'];
      var expectedOutput = ['qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething'];
      var fuzzy = new FuzzySearch(list);

      expect(expectedOutput).to.eql(fuzzy.search('qwe'));
    });

    it('should search in keys', function() {
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

    it('should search in array keys', function() {
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

    it('should search in array keys containing objects', function() {
      var list = [
        {
          persons: [{firstname: 'Patricia', lastname: 'Millaruelo'}, {firstname: 'Itziar', lastname: 'Julia'}],
        },
        {
          persons: [{firstname: 'Alexandría', lastname: 'DCastillo'}, {firstname: 'Gayubas', lastname: 'Pumarola'}],
        },
      ];
      var expectedOutput = [
        {
          persons: [{firstname: 'Patricia', lastname: 'Millaruelo'}, {firstname: 'Itziar', lastname: 'Julia'}],
        },
      ];

      var fuzzy = new FuzzySearch(list, ['persons.firstname']);

      expect(expectedOutput).to.eql(fuzzy.search('tzia'));
    });

    it('should allow to search case sensitive', function() {
      var list = [
        {
          persons: [{firstname: 'Patricia', lastname: 'Millaruelo'}, {firstname: 'Itziar', lastname: 'Julia'}],
        },
        {
          persons: [{firstname: 'patricia', lastname: 'millaruelo'}, {firstname: 'itziar', lastname: 'julia'}],
        },
      ];
      var expectedOutput = [
        {
          persons: [{firstname: 'Patricia', lastname: 'Millaruelo'}, {firstname: 'Itziar', lastname: 'Julia'}],
        },
      ];

      var fuzzy = new FuzzySearch(list, ['persons.firstname'], {
        caseSensitive: true,
      });

      expect(expectedOutput).to.eql(fuzzy.search('Pat'));
    });
  });
});
