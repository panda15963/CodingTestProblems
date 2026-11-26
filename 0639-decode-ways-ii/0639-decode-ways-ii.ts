const MOD = 1000000007;

function numDecodings(s: string): number {
    const length = s.length;
    const chars = s.split('');

    // Dynamic programming variables representing:
    // prev2: dp[i-2] (number of ways to decode up to position i-2)
    // prev1: dp[i-1] (number of ways to decode up to position i-1)
    // current: dp[i] (number of ways to decode up to position i)
    let prev2 = 0;
    let prev1 = 1;
    let current = 0;
  
    // Iterate through each position in the string
    for (let i = 1; i <= length; i++) {
        // Single digit decoding (current character alone)
        if (chars[i - 1] === '*') {
            // '*' can represent digits 1-9, so we have 9 possibilities
            current = (9 * prev1) % MOD;
        } else if (chars[i - 1] !== '0') {
            // Non-zero digit can be decoded as itself
            current = prev1;
        } else {
            // '0' cannot be decoded alone
            current = 0;
        }

        // Two-digit decoding (previous and current character together)
        if (i > 1) {
            if (chars[i - 2] === '*' && chars[i - 1] === '*') {
                // "**" can represent: 11-19 (9 ways) and 21-26 (6 ways) = 15 total ways
                current = (current + 15 * prev2) % MOD;
            } else if (chars[i - 2] === '*') {
                // "*X" where X is a digit
                if (chars[i - 1] > '6') {
                    // Can only use 1 as first digit (17, 18, 19)
                    current = (current + prev2) % MOD;
                } else {
                    // Can use 1 or 2 as first digit (10-16 or 20-26)
                    current = (current + 2 * prev2) % MOD;
                }
            } else if (chars[i - 1] === '*') {
                // "X*" where X is a digit
                if (chars[i - 2] === '1') {
                    // "1*" can represent 11-19 (9 possibilities)
                    current = (current + 9 * prev2) % MOD;
                } else if (chars[i - 2] === '2') {
                    // "2*" can represent 21-26 (6 possibilities)
                    current = (current + 6 * prev2) % MOD;
                }
            } else if (chars[i - 2] !== '0') {
                // Both are regular digits, check if they form a valid two-digit number (10-26)
                const twoDigitValue = parseInt(chars[i - 2]) * 10 + parseInt(chars[i - 1]);
                if (twoDigitValue <= 26) {
                    current = (current + prev2) % MOD;
                }
            }
        }

        // Update variables for next iteration
        prev2 = prev1;
        prev1 = current;
    }

    return current;
}
