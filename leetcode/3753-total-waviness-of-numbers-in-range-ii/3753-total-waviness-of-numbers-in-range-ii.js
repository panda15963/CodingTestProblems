/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var totalWaviness = function(num1, num2) {
    // Helper function to calculate total waviness from 1 to N using Digit DP
    const countWavinessUpTo = (n) => {
        if (n <= 0n) return [0n, 0n]; // returns [count_of_valid_numbers, sum_of_waviness]
        
        const s = n.toString();
        const len = s.length;
        
        // Memoization table structured as: idx, lastDigit, lastCmp, isLess, isStarted
        // Using a Map with serialized string keys for simple multi-dimensional caching
        const memo = new Map();
        
        const dp = (idx, lastDigit, lastCmp, isLess, isStarted) => {
            // Base Case: All digits placed. Returns [count, total_waviness]
            if (idx === len) {
                return [isStarted ? 1n : 0n, 0n];
            }
            
            const key = `${idx},${lastDigit},${lastCmp},${isLess},${isStarted}`;
            if (memo.has(key)) return memo.get(key);
            
            let totalCount = 0n;
            let totalWavinessSum = 0n;
            
            const limit = isLess ? 9 : parseInt(s[idx]);
            
            for (let d = 0; d <= limit; d++) {
                const nextIsLess = isLess || (d < limit);
                
                if (!isStarted) {
                    if (d === 0) {
                        // Keep skipping leading zeros
                        const [cnt, wav] = dp(idx + 1, -1, 0, nextIsLess, false);
                        totalCount += cnt;
                        totalWavinessSum += wav;
                    } else {
                        // First non-zero digit placed
                        const [cnt, wav] = dp(idx + 1, d, 0, nextIsLess, true);
                        totalCount += cnt;
                        totalWavinessSum += wav;
                    }
                } else {
                    // Number has already started, compute digit relationships
                    let currentCmp = 0;
                    if (d > lastDigit) currentCmp = 1;
                    else if (d < lastDigit) currentCmp = -1;
                    
                    let deltaWaviness = 0n;
                    // If lastCmp exists and is strictly opposite to currentCmp, we found a peak or valley
                    if (lastCmp !== 0 && currentCmp !== 0 && currentCmp === -lastCmp) {
                        deltaWaviness = 1n;
                    }
                    
                    const [cnt, wav] = dp(idx + 1, d, currentCmp, nextIsLess, true);
                    
                    totalCount += cnt;
                    // Each subsequent branch containing 'cnt' valid suffixes will carry over our deltaWaviness
                    totalWavinessSum += wav + (deltaWaviness * cnt);
                }
            }
            
            const res = [totalCount, totalWavinessSum];
            memo.set(key, res);
            return res;
        };
        
        return dp(0, -1, 0, false, false);
    };

    const bigNum1 = BigInt(num1);
    const bigNum2 = BigInt(num2);
    
    const ans2 = countWavinessUpTo(bigNum2)[1];
    const ans1 = countWavinessUpTo(bigNum1 - 1n)[1];
    
    // Convert BigInt back to normal JavaScript number as requested by LeetCode structure
    return Number(ans2 - ans1);
};
