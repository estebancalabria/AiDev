const { convertKeysToTitleCase } = require('./laboratorio_copilot');

describe('convertKeysToTitleCase', () => {
  test('should convert keys to title case', () => {
    const obj = {
      name: 'john',
      age: 30,
      occupation: 'developer'
    };

    const expected = {
      Name: 'john',
      Age: 30,
      Occupation: 'developer'
    };

    const result = convertKeysToTitleCase(obj);

    expect(result).toEqual(expected);
  });

  test('should handle empty object', () => {
    const obj = {};

    const expected = {};

    const result = convertKeysToTitleCase(obj);

    expect(result).toEqual(expected);
  });

  test('should handle object with one key', () => {
    const obj = {
      name: 'john'
    };

    const expected = {
      Name: 'john'
    };

    const result = convertKeysToTitleCase(obj);

    expect(result).toEqual(expected);
  });
});`// Test case 1: Empty object
const input1 = {};
const expectedOutput1 = {};
const output1 = convertKeysToTitleCase(input1);
console.log(output1); // Expected output: {}

// Test case 2: Object with lowercase keys
const input2 = {
  name: 'John',
  age: 30,
  city: 'New York'
};
const expectedOutput2 = {
  Name: 'John',
  Age: 30,
  City: 'New York'
};
const output2 = convertKeysToTitleCase(input2);
console.log(output2); // Expected output: { Name: 'John', Age: 30, City: 'New York' }

// Test case 3: Object with mixed case keys
const input3 = {
  firstName: 'Jane',
  lastName: 'Doe',
  occupation: 'Engineer'
};
const expectedOutput3 = {
  FirstName: 'Jane',
  LastName: 'Doe',
  Occupation: 'Engineer'
};
const output3 = convertKeysToTitleCase(input3);
console.log(output3); // Expected output: { FirstName: 'Jane', LastName: 'Doe', Occupation: 'Engineer' }