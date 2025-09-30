const { describe, test, expect } = require('@jest/globals');

let suma;
try {
  ({ suma } = require('./funciones'));
} catch (e1) {
  try {
    ({ suma } = require('../funciones'));
  } catch (e2) {
    ({ suma } = require('../../funciones'));
  }
}

describe('suma', () => {
  test('test_returns_sum_for_two_numbers', () => {
    expect(suma(2, 3)).toBe(5);
    expect(suma(100, 200)).toBe(300);
  });

  test('test_handles_negatives_and_zero_correctly', () => {
    expect(suma(-5, -7)).toBe(-12);
    expect(suma(0, 5)).toBe(5);
    expect(suma(5, 0)).toBe(5);
    expect(suma(10, -3)).toBe(7);
  });

  test('test_commutative_property_for_numbers', () => {
    const pairs = [
      [3, 7],
      [-4, 9],
      [0, 12],
      [2.5, 4.75],
    ];
    for (const [a, b] of pairs) {
      expect(suma(a, b)).toBe(suma(b, a));
    }
  });

  test('test_mixed_number_and_string_results_in_string_concatenation', () => {
    const r1 = suma(2, '3');
    const r2 = suma('3', 2);
    expect(typeof r1).toBe('string');
    expect(typeof r2).toBe('string');
    expect(r1).toBe('23');
    expect(r2).toBe('32');
  });

  test('test_floating_point_precision_behavior', () => {
    const result = suma(0.1, 0.2);
    expect(result).not.toBe(0.3);
    expect(result).toBeCloseTo(0.3, 10);
  });

  test('test_mixing_bigint_and_number_throws_typeerror', () => {
    expect(() => suma(1n, 1)).toThrow(TypeError);
    expect(() => suma(1, 1n)).toThrow(TypeError);
  });

  test('test_sums_large_safe_integers_correctly', () => {
    const a = Number.MAX_SAFE_INTEGER - 1000;
    const b = 1000;
    const result = suma(a, b);
    expect(result).toBe(Number.MAX_SAFE_INTEGER);
    expect(Number.isSafeInteger(result)).toBe(true);
  });

  test('test_returns_nan_when_operand_is_nan', () => {
    expect(suma(NaN, 5)).toBeNaN();
    expect(suma(5, NaN)).toBeNaN();
    expect(suma(NaN, NaN)).toBeNaN();
  });

  test('test_sums_bigint_operands_returns_bigint', () => {
    const result = suma(10n, 20n);
    expect(typeof result).toBe('bigint');
    expect(result).toBe(30n);
  });

  test('test_returns_nan_for_undefined_operand_or_missing_argument', () => {
    expect(suma(undefined, 2)).toBeNaN();
    expect(suma(5)).toBeNaN();
    expect(suma()).toBeNaN();
  });
});