import FuzzySearch from '../src/FuzzySearch';

describe('FuzzySearch', () => {
  it('should return an error when called as a function', () => {
    expect(() => {
      FuzzySearch();
    }).toThrow();
  });

  it('should return strings matching "qwe"', () => {
    const fuzzy = new FuzzySearch(['test', 'again', 'word', 'something', 'qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething']);

    expect(['qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething']).toEqual(fuzzy.search('qwe'));
  });

  it('should return strings matching "x"', () => {
    const fuzzy = new FuzzySearch(['x', 'xx', 'xxx', 't', 'f']);

    expect(['x', 'xx', 'xxx']).toEqual(fuzzy.search('x'));
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

    expect([
      {
        name: 'Alexandría DCastillo Gayubas',
        location: 'Bolivia',
      },
    ]).toEqual(fuzzy.search('als'));
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

    expect([
      {
        name: ['Itziar', 'Julia', 'Pumarola', 'Duenas'],
        location: 'Chile',
      },
    ]).toEqual(fuzzy.search('itzi'));
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

    expect([
      {
        persons: [{ firstname: 'Patricia', lastname: 'Millaruelo' }, { firstname: 'Itziar', lastname: 'Julia' }],
      },
    ]).toEqual(fuzzy.search('tzia'));
  });

  it('should allow to search case sensitive', () => {
    const fuzzy = new FuzzySearch(['Patricia', 'Millaruelo', 'Itziar', 'Julia'], {
      caseSensitive: true,
    });

    expect([]).toEqual(fuzzy.search('mill'));
  });

  it('should return the whole list with an empty query string', () => {
    const list = ['Patricia', 'Millaruelo', 'Itziar', 'Julia'];
    const fuzzy = new FuzzySearch(list);

    expect(list).toEqual(fuzzy.search());
  });

  it('should not match repeating letters', () => {
    const fuzzy = new FuzzySearch(['long string', 'string']);

    expect([]).toEqual(fuzzy.search('looooooong string'));
  });

  it('should allow sorting', () => {
    const fuzzy1 = new FuzzySearch(['a______b______c', 'a__b__c', 'abc'], {
      sort: true,
    });
    const fuzzy2 = new FuzzySearch(['application/cdfx+xml', 'application/pdf'], {
      sort: true,
    });

    expect(['abc', 'a__b__c', 'a______b______c']).toEqual(fuzzy1.search('abc'));
    expect(['application/pdf', 'application/cdfx+xml']).toEqual(fuzzy2.search('pdf'));
  });

  it('should boost score if query matches item exactly', () => {
    const fuzzy = new FuzzySearch(['prolog', 'rust', 'r', 'ruby'], {
      sort: true,
    });

    expect(['r', 'rust', 'ruby', 'prolog']).toEqual(fuzzy.search('r'));
  });

  it('allows for configuration when the keys parameter is omitted', () => {
    const fuzzy = new FuzzySearch(['a'], {
      sort: true,
    });

    expect(['a']).toEqual(fuzzy.search('a'));
  });

  it('should rank words with matching letters close to each other higher', () => {
    const fuzzy = new FuzzySearch(['Alarm Dictionary', 'BO_ALARM_DICTIONARY', 'Dogmatix Board Replacements', 'DOGMATIX_BOARD_REPLACEMENT_V'], {
      sort: true,

    });

    expect(['Dogmatix Board Replacements', 'DOGMATIX_BOARD_REPLACEMENT_V', 'BO_ALARM_DICTIONARY']).toEqual(fuzzy.search('board'));
  });

  it('should be able to search by numeric values', () => {
    const fuzzy = new FuzzySearch([1, 2, 11, 12]);

    expect([1, 11, 12]).toEqual(fuzzy.search(1));
  });

  it('should rank numbers', () => {
    const fuzzy = new FuzzySearch([12, 11, 1, 2], {sort: true,});

    expect([1, 12, 11]).toEqual(fuzzy.search(1));
  });
});
