/**
 * Finds the minimum number of cuts needed to partition a string into palindromes
 * @param {string} s - The input string to partition
 * @returns {number} The minimum number of cuts needed
 */
function minCut(s) {
    const length = s.length;

    // isPalindrome[i][j] indicates whether s[i...j] is a palindrome
    const isPalindrome = Array.from(
        { length: length },
        () => Array(length).fill(true)
    );

    // Build palindrome lookup table using dynamic programming
    for (let startIndex = length - 1; startIndex >= 0; startIndex--) {
        for (
            let endIndex = startIndex + 1;
            endIndex < length;
            endIndex++
        ) {
            isPalindrome[startIndex][endIndex] =
                s[startIndex] === s[endIndex] &&
                isPalindrome[startIndex + 1][endIndex - 1];
        }
    }

    // minCuts[i] = minimum cuts needed for s[0...i]
    const minCuts = Array.from(
        { length: length },
        (_, index) => index
    );

    // Calculate minimum cuts
    for (let endPos = 1; endPos < length; endPos++) {
        for (let startPos = 0; startPos <= endPos; startPos++) {

            // s[startPos...endPos] is a palindrome
            if (isPalindrome[startPos][endPos]) {

                // Entire substring is palindrome
                if (startPos === 0) {
                    minCuts[endPos] = 0;
                } else {
                    // Cut before startPos
                    minCuts[endPos] = Math.min(
                        minCuts[endPos],
                        1 + minCuts[startPos - 1]
                    );
                }
            }
        }
    }

    return minCuts[length - 1];
}