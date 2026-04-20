import { describe, it, expect } from 'vitest';
import { getImage } from './getImage';

describe('getImage', () => {
  it('returns correct path', () => {
    expect(getImage('test.png')).toBe('/src/renderer/src/assets/images/test.png');
  });
});
