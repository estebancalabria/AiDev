const mergeSort = require('./demo');

test('should sort an array in ascending order', () => {
  const arr = [5, 3, 8, 2, 1, 4];
  const sortedArr = mergeSort(arr);
  expect(sortedArr).toEqual([1, 2, 3, 4, 5, 8]);
});

test('should return an empty array when given an empty array', () => {
  const arr = [];
  const sortedArr = mergeSort(arr);
  expect(sortedArr).toEqual([]);
});

test('should return the same array when given an array with a single element', () => {
  const arr = [42];
  const sortedArr = mergeSort(arr);
  expect(sortedArr).toEqual([42]);
});

test('should sort an array with duplicate elements', () => {
  const arr = [5, 2, 8, 2, 1, 4, 5];
  const sortedArr = mergeSort(arr);
  expect(sortedArr).toEqual([1, 2, 2, 4, 5, 5, 8]);
});