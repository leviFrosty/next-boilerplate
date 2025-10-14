import { describe, expect, it } from 'vitest';
import { add } from './logic';

describe('logic', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
