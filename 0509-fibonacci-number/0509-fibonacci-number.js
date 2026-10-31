/**
 * Calculates the nth Fibonacci number using an iterative approach
 * @param {number} n - The position in the Fibonacci sequence (0-indexed)
 * @returns {number} The nth Fibonacci number
 */
function fib(n) {
    // Initialize the first two Fibonacci numbers
    let currentFib = 0;
    let nextFib = 1;

    // Iterate n times to calculate the nth Fibonacci number
    while (n > 0) {
        const tempFib = nextFib;

        nextFib = currentFib + nextFib;
        currentFib = tempFib;

        n--;
    }

    return currentFib;
}