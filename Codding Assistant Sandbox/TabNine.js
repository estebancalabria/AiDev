/**
 * Returns the nth number in the Fibonacci sequence.
 *
 * @param {number} n - The position of the number in the Fibonacci sequence.
 * @returns {number} The nth number in the Fibonacci sequence.
 */
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}