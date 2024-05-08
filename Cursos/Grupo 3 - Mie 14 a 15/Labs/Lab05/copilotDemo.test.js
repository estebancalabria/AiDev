const convertirFecha = require('./copilotDemo');

// Test case 1: Valid date format
test('Converts valid date format to expected output', () => {
  const input = '2022-12-31';
  const expectedOutput = '31-12-2022';
  const output = convertirFecha(input);
  expect(output).toBe(expectedOutput);
});

// Test case 2: Valid date format with leading zeros
test('Converts valid date format with leading zeros to expected output', () => {
  const input = '2022-01-01';
  const expectedOutput = '01-01-2022';
  const output = convertirFecha(input);
  expect(output).toBe(expectedOutput);
});

// Test case 3: Invalid date format
test('Returns "Invalid date format" for invalid date format', () => {
  const input = '2022/12/31';
  const expectedOutput = 'Invalid date format';
  const output = convertirFecha(input);
  expect(output).toBe(expectedOutput);
});

// Test case 4: Empty input
test('Returns empty string for empty input', () => {
  const input = '';
  const expectedOutput = '';
  const output = convertirFecha(input);
  expect(output).toBe(expectedOutput);
});

// Test case 5: Invalid input type
test('Returns "Invalid input type" for non-string input', () => {
  const input = 123;
  const expectedOutput = 'Invalid input type';
  const output = convertirFecha(input);
  expect(output).toBe(expectedOutput);
});const convertirFecha = require('./copilotDemo');

// Test case 1: Valid date format
test('Converts valid date format correctly', () => {
  const input = '2022-12-31';
  const expectedOutput = '31-12-2022';
  const output = convertirFecha(input);
  expect(output).toBe(expectedOutput);
});

// Test case 2: Valid date format with leading zeros
test('Converts valid date format with leading zeros correctly', () => {
  const input = '2022-01-01';
  const expectedOutput = '01-01-2022';
  const output = convertirFecha(input);
  expect(output).toBe(expectedOutput);
});

// Test case 3: Invalid date format
test('Returns "Invalid date format" for invalid date format', () => {
  const input = '2022/12/31';
  const expectedOutput = 'Invalid date format';
  const output = convertirFecha(input);
  expect(output).toBe(expectedOutput);
});