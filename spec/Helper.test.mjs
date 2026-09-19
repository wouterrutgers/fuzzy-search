import Helper from '../src/Helper.mjs';
import { describe, expect, it } from 'vitest';

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

    expect(Helper.getDescendantProperty(object, 'level1.level2.level3')).toEqual(['NL', 'EN']);
  });
});
