import { describe, expect, it } from "vitest";
import { example } from ".";

describe('example', () => {
    it('should return example', () => {
        expect(example()).toBe('example');
    });
})