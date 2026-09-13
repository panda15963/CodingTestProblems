/**
 * Generates a hint for the Bulls and Cows game
 * @param secret - The secret number as a string
 * @param guess - The guessed number as a string
 * @returns A hint in the format "xAyB" where x is bulls (correct digit and position) 
 *          and y is cows (correct digit but wrong position)
 */
function getHint(secret: string, guess: string): string {
    // Array to count frequency of each digit (0-9) in secret that are not bulls
    const secretDigitCount: number[] = Array(10).fill(0);
    // Array to count frequency of each digit (0-9) in guess that are not bulls
    const guessDigitCount: number[] = Array(10).fill(0);
  
    // Count of bulls (correct digit in correct position)
    let bulls: number = 0;
  
    // First pass: identify bulls and count non-bull digits
    for (let i = 0; i < secret.length; ++i) {
        if (secret[i] === guess[i]) {
            // Found a bull (exact match)
            ++bulls;
        } else {
            // Not a bull, increment digit counts for potential cows
            ++secretDigitCount[+secret[i]];
            ++guessDigitCount[+guess[i]];
        }
    }
  
    // Count of cows (correct digit in wrong position)
    let cows: number = 0;
  
    // Second pass: calculate cows by finding minimum overlap of non-bull digits
    for (let digit = 0; digit < 10; ++digit) {
        // A digit can only be a cow if it appears in both secret and guess (as non-bulls)
        cows += Math.min(secretDigitCount[digit], guessDigitCount[digit]);
    }
  
    // Return the hint in "xAyB" format
    return `${bulls}A${cows}B`;
}
