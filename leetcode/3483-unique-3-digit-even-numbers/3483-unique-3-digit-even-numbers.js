/**
 * Counts unique three-digit numbers where:
 * - The last digit (ones place) is even
 * - The first digit (hundreds place) is non-zero
 * - All three digits come from different positions in the input array
 *
 * @param {number[]} digits
 * @returns {number}
 */
function totalNumbers(digits) {
    // Set to store unique three-digit numbers
    const uniqueNumbers = new Set();
    const arrayLength = digits.length;

    // Ones place
    for (let onesIndex = 0; onesIndex < arrayLength; ++onesIndex) {

        // Ones digit must be even
        if (digits[onesIndex] % 2 === 1) {
            continue;
        }

        // Tens place
        for (let tensIndex = 0; tensIndex < arrayLength; ++tensIndex) {

            // Cannot use the same position
            if (onesIndex === tensIndex) {
                continue;
            }

            // Hundreds place
            for (
                let hundredsIndex = 0;
                hundredsIndex < arrayLength;
                ++hundredsIndex
            ) {

                // Hundreds digit cannot be 0
                // Cannot use the same position
                if (
                    digits[hundredsIndex] === 0 ||
                    hundredsIndex === onesIndex ||
                    hundredsIndex === tensIndex
                ) {
                    continue;
                }

                // Construct three-digit number
                const threeDigitNumber =
                    digits[hundredsIndex] * 100 +
                    digits[tensIndex] * 10 +
                    digits[onesIndex];

                // Store only unique numbers
                uniqueNumbers.add(threeDigitNumber);
            }
        }
    }

    return uniqueNumbers.size;
}