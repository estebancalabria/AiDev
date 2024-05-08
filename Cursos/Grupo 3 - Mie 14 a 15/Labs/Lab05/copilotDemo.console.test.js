// Test case 1: Valid date format
const input1 = '2022-12-31';
const expectedOutput1 = '31-12-2022';
const output1 = convertirFecha(input1);
console.log(output1 === expectedOutput1); // Expected output: true

// Test case 2: Valid date format with leading zeros
const input2 = '2022-01-01';
const expectedOutput2 = '01-01-2022';
const output2 = convertirFecha(input2);
console.log(output2 === expectedOutput2); // Expected output: true

// Test case 3: Invalid date format
const input3 = '2022/12/31';
const expectedOutput3 = 'Invalid date format';
const output3 = convertirFecha(input3);
console.log(output3 === expectedOutput3); // Expected output: true