/**
 * Restores all possible valid IP addresses from a given string of digits
 *
 * @param {string} s - String containing only digits
 * @returns {string[]} - Array of all possible valid IP addresses
 */
function restoreIpAddresses(s) {
    const inputLength = s.length;
    const validIpAddresses = [];
    const currentSegments = [];

    /**
     * Depth-first search to explore all possible IP combinations
     *
     * @param {number} currentIndex - Current position in input string
     */
    const performDFS = (currentIndex) => {
        // Base case: formed 4 valid segments and used all characters
        if (currentIndex >= inputLength && currentSegments.length === 4) {
            validIpAddresses.push(currentSegments.join('.'));
            return;
        }

        // Pruning condition
        if (currentIndex >= inputLength || currentSegments.length === 4) {
            return;
        }

        let currentNumber = 0;

        // Try segment lengths 1, 2, 3
        for (
            let endIndex = currentIndex;
            endIndex < currentIndex + 3 && endIndex < inputLength;
            endIndex++
        ) {
            // Convert digit character to number
            currentNumber =
                currentNumber * 10 + (s[endIndex].charCodeAt(0) - '0'.charCodeAt(0));

            // Invalid cases:
            // 1. Number > 255
            // 2. Leading zero (ex: "01")
            if (
                currentNumber > 255 ||
                (endIndex > currentIndex && s[currentIndex] === '0')
            ) {
                break;
            }

            // Add current segment
            currentSegments.push(currentNumber.toString());

            // Search next segment
            performDFS(endIndex + 1);

            // Backtracking
            currentSegments.pop();
        }
    };

    // Start DFS
    performDFS(0);

    return validIpAddresses;
}