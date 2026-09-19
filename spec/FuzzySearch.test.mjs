import FuzzySearch from '../src/FuzzySearch.mjs';
import { describe, expect, it } from 'vitest';

describe('FuzzySearch', () => {
  it('should return an error when called as a function', () => {
    expect(() => {
      FuzzySearch();
    }).toThrow();
  });

  it('should return strings matching "qwe"', () => {
    const fuzzy = new FuzzySearch(['test', 'again', 'word', 'something', 'qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething']);

    expect(fuzzy.search('qwe')).toEqual(['qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething']);
  });

  it('should return strings matching "x"', () => {
    const fuzzy = new FuzzySearch(['x', 'xx', 'xxx', 't', 'f']);

    expect(fuzzy.search('x')).toEqual(['x', 'xx', 'xxx']);
  });

  it('should search in keys', () => {
    const fuzzy = new FuzzySearch([
      {
        name: 'Betania Ivana Besoli Leiten',
        location: 'El Salvador',
      },
      {
        name: 'Alexandría DCastillo Gayubas',
        location: 'Bolivia',
      },
    ], ['name']);

    expect(fuzzy.search('als')).toEqual([
      {
        name: 'Alexandría DCastillo Gayubas',
        location: 'Bolivia',
      },
    ]);
  });

  it('should search in array keys', () => {
    const fuzzy = new FuzzySearch([
      {
        name: ['Irene', 'Maseras'],
        location: 'Colombia',
      },
      {
        name: ['Itziar', 'Julia', 'Pumarola', 'Duenas'],
        location: 'Chile',
      },
    ], ['name']);

    expect(fuzzy.search('itzi')).toEqual([
      {
        name: ['Itziar', 'Julia', 'Pumarola', 'Duenas'],
        location: 'Chile',
      },
    ]);
  });

  it('should search in array keys containing objects', () => {
    const fuzzy = new FuzzySearch([
      {
        persons: [{ firstname: 'Patricia', lastname: 'Millaruelo' }, { firstname: 'Itziar', lastname: 'Julia' }],
      },
      {
        persons: [{ firstname: 'Alexandría', lastname: 'DCastillo' }, { firstname: 'Gayubas', lastname: 'Pumarola' }],
      },
    ], ['persons.firstname']);

    expect(fuzzy.search('tzia')).toEqual([
      {
        persons: [{ firstname: 'Patricia', lastname: 'Millaruelo' }, { firstname: 'Itziar', lastname: 'Julia' }],
      },
    ]);
  });

  it('should allow to search case sensitive', () => {
    const fuzzy = new FuzzySearch(['Patricia', 'Millaruelo', 'Itziar', 'Julia'], {
      caseSensitive: true,
    });

    expect(fuzzy.search('mill')).toEqual([]);
  });

  it('should return the whole list with an empty query string', () => {
    const list = ['Patricia', 'Millaruelo', 'Itziar', 'Julia'];
    const fuzzy = new FuzzySearch(list);

    expect(fuzzy.search()).toEqual(list);
  });

  it('should not match repeating letters', () => {
    const fuzzy = new FuzzySearch(['long string', 'string']);

    expect(fuzzy.search('looooooong string')).toEqual([]);
  });

  it('should allow sorting', () => {
    const fuzzy1 = new FuzzySearch(['a______b______c', 'a__b__c', 'abc'], {
      sort: true,
    });
    const fuzzy2 = new FuzzySearch(['application/cdfx+xml', 'application/pdf'], {
      sort: true,
    });

    expect(fuzzy1.search('abc')).toEqual(['abc', 'a__b__c', 'a______b______c']);
    expect(fuzzy2.search('pdf')).toEqual(['application/pdf', 'application/cdfx+xml']);
  });

  it('should boost score if query matches item exactly', () => {
    const fuzzy = new FuzzySearch(['prolog', 'rust', 'r', 'ruby'], {
      sort: true,
    });

    expect(fuzzy.search('r')).toEqual(['r', 'rust', 'ruby', 'prolog']);
  });

  it('allows for configuration when the keys parameter is omitted', () => {
    const fuzzy = new FuzzySearch(['a'], {
      sort: true,
    });

    expect(fuzzy.search('a')).toEqual(['a']);
  });

  it('should rank words with matching letters close to each other higher', () => {
    const fuzzy = new FuzzySearch(['Alarm Dictionary', 'BO_ALARM_DICTIONARY', 'Dogmatix Board Replacements', 'DOGMATIX_BOARD_REPLACEMENT_V'], {
      sort: true,

    });

    expect(fuzzy.search('board')).toEqual(['Dogmatix Board Replacements', 'DOGMATIX_BOARD_REPLACEMENT_V', 'BO_ALARM_DICTIONARY']);
  });

  it('should be able to search by numeric values', () => {
    const fuzzy = new FuzzySearch([1, 2, 11, 12]);

    expect(fuzzy.search(1)).toEqual([1, 11, 12]);
  });

  it('should rank numbers', () => {
    const fuzzy = new FuzzySearch([12, 11, 1, 2], {sort: true,});

    expect(fuzzy.search(1)).toEqual([1, 12, 11]);
  });
});
