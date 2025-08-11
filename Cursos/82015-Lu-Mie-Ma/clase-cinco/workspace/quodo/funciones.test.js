const { titleCase } = require('./funciones');

describe('titleCase', () => {
  test('Converts a lowercase string to Title Case, capitalizing the first letter of each word.', () => {
    expect(titleCase('hello world')).toBe('Hello World');
  });

  test('Converts an uppercase string to Title Case, ensuring all words are properly capitalized.', () => {
    expect(titleCase('HELLO WORLD')).toBe('Hello World');
  });

  test('Handles mixed-case input by converting each word to Title Case.', () => {
    expect(titleCase('hELLo WoRLd')).toBe('Hello World');
  });

  test('Handles multiple consecutive spaces between words without altering the spacing.', () => {
    expect(titleCase('hello    world')).toBe('Hello    World');
  });

  test('Returns an empty string when given an empty input.', () => {
    expect(titleCase('')).toBe('');
  });

  test('Processes strings with non-alphabetic characters, ensuring only alphabetic characters are affected.', () => {
    expect(titleCase('hello world! 123')).toBe('Hello World! 123');
  });
});