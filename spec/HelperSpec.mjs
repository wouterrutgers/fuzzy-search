import Helper from '../src/Helper.mjs';

describe('Helper', () => {
  it('should allow for deep key search', () => {
    const object = {
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

    expect(['NL', 'EN']).toEqual(Helper.getDescendantProperty(object, 'level1.level2.level3'));
  });
});
