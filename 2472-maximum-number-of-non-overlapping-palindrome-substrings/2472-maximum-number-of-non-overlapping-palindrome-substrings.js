var maxPalindromes = function(s, k) {
    const n = s.length;

    // isPalindrome[i][j] = true if s[i...j] is a palindrome
    const isPalindrome = Array(n)
        .fill(null)
        .map(() => Array(n).fill(true));

    // memo[i] = maximum number of non-overlapping palindromes
    // starting from index i
    const memo = Array(n).fill(-1);

    // Build palindrome table
    for (let start = n - 1; start >= 0; start--) {
        for (let end = start + 1; end < n; end++) {
            isPalindrome[start][end] =
                s[start] === s[end] &&
                isPalindrome[start + 1][end - 1];
        }
    }

    // Recursive function with memoization
    const findMaxPalindromes = (startIdx) => {
        if (startIdx >= n) {
            return 0;
        }

        if (memo[startIdx] !== -1) {
            return memo[startIdx];
        }

        // Option 1: Skip current position
        let maxCount = findMaxPalindromes(startIdx + 1);

        // Option 2: Select a palindrome starting at current position
        for (let endIdx = startIdx + k - 1; endIdx < n; endIdx++) {
            if (isPalindrome[startIdx][endIdx]) {
                maxCount = Math.max(
                    maxCount,
                    1 + findMaxPalindromes(endIdx + 1)
                );
            }
        }

        memo[startIdx] = maxCount;
        return maxCount;
    };

    return findMaxPalindromes(0);
};