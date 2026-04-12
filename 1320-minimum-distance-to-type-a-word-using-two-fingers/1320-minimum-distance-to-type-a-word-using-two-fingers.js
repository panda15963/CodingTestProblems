/**
 * Calculates minimum distance to type a word using two fingers on a keyboard
 * @param {string} word - The word to type (uppercase letters only)
 * @returns {number} Minimum total distance fingers need to travel
 */
function minimumDistance(word) {
    const wordLength = word.length;
    const INF = 1 << 30;  // Large value representing infinity

    // dp[i][leftFinger][rightFinger] = minimum distance to type first i+1 characters
    // with left finger on position leftFinger and right finger on position rightFinger
    const dp = Array(wordLength)
        .fill(null)
        .map(() => Array(26)
            .fill(null)
            .map(() => Array(26).fill(INF))
        );

    // Helper to convert char to number (A=0, B=1, ...)
    function charToPos(ch) {
        return ch.charCodeAt(0) - 65;
    }

    // Initialize first character - can be typed with either finger at no cost
    // The other finger can be at any position
    const firstCharPos = charToPos(word[0]);
    for (let otherFinger = 0; otherFinger < 26; otherFinger++) {
        dp[0][firstCharPos][otherFinger] = 0;  // First char typed with left finger
        dp[0][otherFinger][firstCharPos] = 0;  // First char typed with right finger
    }

    // Process each subsequent character
    for (let i = 1; i < wordLength; i++) {
        const prevChar = charToPos(word[i - 1]);  // Previous character position
        const currChar = charToPos(word[i]);      // Current character to type
        const moveDist = dist(prevChar, currChar); // Distance between consecutive chars

        // Try all possible finger configurations
        for (let otherFinger = 0; otherFinger < 26; otherFinger++) {
            // Case 1: Same finger that typed previous char types current char
            // Left finger moves from prevChar to currChar, right stays at otherFinger
            dp[i][currChar][otherFinger] = Math.min(
                dp[i][currChar][otherFinger],
                dp[i - 1][prevChar][otherFinger] + moveDist
            );

            // Right finger moves from prevChar to currChar, left stays at otherFinger
            dp[i][otherFinger][currChar] = Math.min(
                dp[i][otherFinger][currChar],
                dp[i - 1][otherFinger][prevChar] + moveDist
            );

            // Case 2: The other finger (not at prevChar) types current char
            if (otherFinger === prevChar) {
                // The finger at otherFinger position was the one that typed previous char
                // So we use the other finger to type current char
                for (let prevOtherFinger = 0; prevOtherFinger < 26; prevOtherFinger++) {
                    const otherFingerDist = dist(prevOtherFinger, currChar);

                    // Left finger was at prevOtherFinger, moves to currChar
                    dp[i][currChar][otherFinger] = Math.min(
                        dp[i][currChar][otherFinger],
                        dp[i - 1][prevOtherFinger][prevChar] + otherFingerDist
                    );

                    // Right finger was at prevOtherFinger, moves to currChar
                    dp[i][otherFinger][currChar] = Math.min(
                        dp[i][otherFinger][currChar],
                        dp[i - 1][prevChar][prevOtherFinger] + otherFingerDist
                    );
                }
            }
        }
    }

    // Find minimum distance among all valid final configurations
    // One finger must be at the last character position
    let minDistance = INF;
    const lastChar = charToPos(word[wordLength - 1]);

    for (let otherFinger = 0; otherFinger < 26; otherFinger++) {
        minDistance = Math.min(minDistance, dp[wordLength - 1][lastChar][otherFinger]);
        minDistance = Math.min(minDistance, dp[wordLength - 1][otherFinger][lastChar]);
    }

    return minDistance;
}


/**
 * Calculate Manhattan distance between two keys on a 6x5 keyboard layout
 * Keys are arranged as: A=0, B=1, ..., Z=25
 * Keyboard layout: 6 columns per row
 * @param {number} keyA - First key position (0-25)
 * @param {number} keyB - Second key position (0-25)
 * @returns {number} Manhattan distance between the two keys
 */
function dist(keyA, keyB) {
    const rowA = Math.floor(keyA / 6);
    const colA = keyA % 6;
    const rowB = Math.floor(keyB / 6);
    const colB = keyB % 6;
    return Math.abs(rowA - rowB) + Math.abs(colA - colB);
}