'use strict';

var FuzzySearch = require('./../dist/fuzzy-search').default;
var expect = require('chai').expect;

describe('Fuzzy', function() {
  describe('search', function() {
    it('should return an error when called as a function', function() {
      expect(FuzzySearch).to.throw('Cannot call a class as a function');
    });

    it('should return an empty array when searching without items', function() {
      var search = new Fuzzy();

      expect([]).to.eql(search.search());
    });

    it('should return strings matching "qwe"', function() {
      var list = ['test', 'again', 'word', 'something', 'qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething'];
      var fuzzy = new FuzzySearch(list);

      expect(['qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething']).to.eql(fuzzy.search('qwe'));
    });

    it('should search in keys', function() {
      var list = [
        {
          name: 'Irene Maseras',
          location: 'Colombia',
        },
        {
          name: 'Patricia O. Millaruelo',
          location: 'Colombia',
        },
        {
          name: 'Itziar Julia Pumarola Duenas',
          location: 'Chile',
        },
        {
          name: 'Betania Ivana Besoli Leites',
          location: 'El Salvador',
        },
        {
          name: 'Alexandría DCastillo Gayubas',
          location: 'Bolivia',
        },
      ];
      var results = [
        {
          name: 'Itziar Julia Pumarola Duenas',
          location: 'Chile',
        },
        {
          name: 'Betania Ivana Besoli Leites',
          location: 'El Salvador',
        },
        {
          name: 'Alexandría DCastillo Gayubas',
          location: 'Bolivia',
        },
      ];

      var fuzzy = new FuzzySearch(list, ['name']);

      expect(results).to.eql(fuzzy.search('als'));
    });

    it('should search in array keys', function() {
      var list = [
        {
          name: ['Irene', 'Maseras'],
          location: 'Colombia',
        },
        {
          name: ['Patricia', 'O.', 'Millaruelo'],
          location: 'Colombia',
        },
        {
          name: ['Itziar', 'Julia', 'Pumarola', 'Duenas'],
          location: 'Chile',
        },
        {
          name: ['Betania', 'Ivana', 'Besoli', 'Leites'],
          location: 'El Salvador',
        },
        {
          name: ['Alexandría', 'DCastillo', 'Gayubas'],
          location: 'Bolivia',
        },
      ];
      var results = [
        {
          name: ['Itziar', 'Julia', 'Pumarola', 'Duenas'],
          location: 'Chile',
        },
      ];

      var fuzzy = new FuzzySearch(list, ['name']);

      expect(results).to.eql(fuzzy.search('itzi'));
    });

    it('should search in array keys containing objects', function() {
      var list = [
        {
          name: [{firstname: 'Patricia', lastname: 'Millaruelo'}, {firstname: 'Itziar', lastname: 'Julia'}],
        },
        {
          name: [{firstname: 'Itziar', lastname: 'Julia'}, {firstname: 'Pumarola', lastname: 'Duenas'}],
        },
        {
          name: [{firstname: 'Betania', lastname: 'Ivana'}, {firstname: 'Besoli', lastname: 'Leites'}],
        },
        {
          name: [{firstname: 'Alexandría', lastname: 'DCastillo'}, {firstname: 'Gayubas', lastname: 'Pumarola'}],
        },
      ];
      var results = [
        {
          name: [{firstname: 'Patricia', lastname: 'Millaruelo'}, {firstname: 'Itziar', lastname: 'Julia'}],
        },
        {
          name: [{firstname: 'Itziar', lastname: 'Julia'}, {firstname: 'Pumarola', lastname: 'Duenas'}],
        },
      ];

      var fuzzy = new FuzzySearch(list, ['name.firstname']);

      expect(results).to.eql(fuzzy.search('tzia'));
    });
  });
});
