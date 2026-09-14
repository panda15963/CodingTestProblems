function isAdditiveNumber(num: string): boolean {
    const n = num.length;
  
    // Try all possible combinations of first two numbers
    // i represents the end position of the first number (exclusive)
    for (let i = 1; i < Math.min(n - 1, 19); i++) {
        // j represents the end position of the second number (exclusive)
        for (let j = i + 1; j < Math.min(n, i + 19); j++) {
            // First number cannot have leading zeros (except single digit 0)
            if (i > 1 && num[0] === '0') break;
          
            // Second number cannot have leading zeros (except single digit 0)
            if (j - i > 1 && num[i] === '0') continue;
          
            // Extract the first two numbers
            const firstNum = BigInt(num.substring(0, i));
            const secondNum = BigInt(num.substring(i, j));
          
            // Check if the remaining string forms a valid additive sequence
            const remaining = num.substring(j);
            if (checkAdditiveSequence(firstNum, secondNum, remaining)) {
                return true;
            }
        }
    }
  
    return false;
}

function checkAdditiveSequence(prev1: bigint, prev2: bigint, remaining: string): boolean {
    // Base case: if no more digits left, the sequence is valid
    if (remaining.length === 0) {
        return true;
    }
  
    // Calculate the expected sum of the two previous numbers
    const expectedSum = prev1 + prev2;
  
    // The next number cannot have leading zeros (except 0 itself)
    if (expectedSum > 0n && remaining[0] === '0') {
        return false;
    }
  
    // Convert expectedSum to string for comparison
    const expectedSumStr = expectedSum.toString();
  
    // Check if the remaining string starts with the expected sum
    if (remaining.startsWith(expectedSumStr)) {
        // Extract the next remaining part after the matched sum
        const nextRemaining = remaining.substring(expectedSumStr.length);
      
        // Recursively check the rest of the string with updated previous numbers
        return checkAdditiveSequence(prev2, expectedSum, nextRemaining);
    }
  
    return false;
}
