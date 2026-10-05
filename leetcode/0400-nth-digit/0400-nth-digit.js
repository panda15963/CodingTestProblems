/**
 * Find the nth digit in the infinite integer sequence
 * 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...
 *
 * @param {number} n - The position of the digit to find (1-indexed)
 * @return {number} The nth digit in the sequence
 */
function findNthDigit(n) {
    let digitCount = 1;
    let rangeCount = 9;

    while (digitCount * rangeCount < n) {
        n -= digitCount * rangeCount;
        digitCount++;
        rangeCount *= 10;
    }

    const targetNumber =
        Math.pow(10, digitCount - 1) +
        Math.floor((n - 1) / digitCount);

    const digitIndex = (n - 1) % digitCount;

    return parseInt(targetNumber.toString()[digitIndex]);
}