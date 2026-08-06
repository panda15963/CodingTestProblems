/**
 * Finds the smallest number greater than or equal to n
 * whose digit product is divisible by t.
 *
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
function smallestNumber(n, t) {
    // Search starting from n
    for (let currentNumber = n; ; currentNumber++) {
        let digitProduct = 1;
        let tempNumber = currentNumber;

        // Calculate product of digits
        while (tempNumber > 0) {
            const lastDigit = tempNumber % 10;
            digitProduct *= lastDigit;
            tempNumber = Math.floor(tempNumber / 10);
        }

        // Check divisibility
        if (digitProduct % t === 0) {
            return currentNumber;
        }
    }
}