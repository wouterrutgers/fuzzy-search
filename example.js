var FuzzySearch = require('fuzzy-search');

var people = [
  {
    name: {
      firstName: 'Jesse',
      lastName: 'Bowen',
    },
    state: 'Seattle',
  }
];

var fuzzy = new FuzzySearch(people, ['name.firstName', 'state'], {
  caseSensitive: true,
});
var result = fuzzy.search('ess');
