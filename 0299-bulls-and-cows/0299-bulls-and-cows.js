/**
 * Generates a hint for the Bulls and Cows game
 * @param {string} secret - The secret number as a string
 * @param {string} guess - The guessed number as a string
 * @returns {string} A hint in the format "xAyB"
 */
function getHint(secret, guess) {
    // Array to count frequency of each digit (0-9) in secret that are not bulls
    const secretDigitCount = Array(10).fill(0);

    // Array to count frequency of each digit (0-9) in guess that are not bulls
    const guessDigitCount = Array(10).fill(0);

    // Count of bulls (correct digit in correct position)
    let bulls = 0;

    // First pass: identify bulls and count non-bull digits
    for (let i = 0; i < secret.length; ++i) {
        if (secret[i] === guess[i]) {
            // Found a bull (exact match)
            ++bulls;
        } else {
            // Not a bull, increment digit counts for potential cows
            ++secretDigitCount[Number(secret[i])];
            ++guessDigitCount[Number(guess[i])];
        }
    }

    // Count of cows (correct digit in wrong position)
    let cows = 0;

    // Second pass: calculate cows
    for (let digit = 0; digit < 10; ++digit) {
        cows += Math.min(
            secretDigitCount[digit],
            guessDigitCount[digit]
        );
    }

    // Return the hint in "xAyB" format
    return `${bulls}A${cows}B`;
}