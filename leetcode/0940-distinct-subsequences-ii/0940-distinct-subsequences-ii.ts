/**
 * Counts the number of distinct non-empty subsequences of a string.
 * Uses dynamic programming to track the count of subsequences ending with each character.
 * 
 * @param s - The input string to find distinct subsequences from
 * @returns The total number of distinct subsequences modulo 10^9 + 7
 */
function distinctSubseqII(s: string): number {
    // Modulo value to prevent integer overflow
    const MOD: number = 1e9 + 7;
  
    // Array to store count of distinct subsequences ending with each letter (a-z)
    // Index 0 represents 'a', index 1 represents 'b', etc.
    const subsequenceCountByChar: number[] = new Array(26).fill(0);
  
    // Process each character in the input string
    for (const char of s) {
        // Calculate the character's index (0-25 for a-z)
        const charIndex: number = char.charCodeAt(0) - 'a'.charCodeAt(0);
      
        // Update count for subsequences ending with current character
        // New count = sum of all existing subsequences (which can be extended) + 1 (for the character itself)
        const totalExistingSubsequences: number = subsequenceCountByChar.reduce(
            (sum: number, count: number) => (sum + count) % MOD, 
            0
        );
        subsequenceCountByChar[charIndex] = (totalExistingSubsequences + 1) % MOD;
    }
  
    // Return the total count of all distinct subsequences
    return subsequenceCountByChar.reduce(
        (sum: number, count: number) => (sum + count) % MOD, 
        0
    );
}
