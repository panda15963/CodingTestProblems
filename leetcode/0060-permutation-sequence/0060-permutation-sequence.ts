/**
 * Finds the k-th permutation sequence of numbers from 1 to n
 * @param n - The range of numbers from 1 to n
 * @param k - The k-th permutation to find (1-indexed)
 * @returns The k-th permutation as a string
 */
function getPermutation(n: number, k: number): string {
    let result: string = '';
  
    // Track which numbers have been used in the permutation
    const isUsed: boolean[] = Array.from({ length: n + 1 }, () => false);
  
    // Build the permutation digit by digit
    for (let position = 0; position < n; position++) {
        // Calculate factorial of remaining positions
        // This represents how many permutations exist for each choice at current position
        let factorial: number = 1;
        for (let i = 1; i < n - position; i++) {
            factorial *= i;
        }
      
        // Try each unused number in ascending order
        for (let digit = 1; digit <= n; digit++) {
            if (!isUsed[digit]) {
                // Check if k falls within the permutations starting with this digit
                if (k > factorial) {
                    // Skip this digit's permutations and continue to next digit
                    k -= factorial;
                } else {
                    // This is the correct digit for current position
                    result += digit;
                    isUsed[digit] = true;
                    break;
                }
            }
        }
    }
  
    return result;
}