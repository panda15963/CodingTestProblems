class Solution {
    public String getPermutation(int n, int k) {
        // StringBuilder to build the result permutation
        StringBuilder result = new StringBuilder();
      
        // Track which numbers have been used (1-indexed for convenience)
        boolean[] used = new boolean[n + 1];
      
        // Build the permutation digit by digit
        for (int position = 0; position < n; position++) {
            // Calculate factorial of remaining positions
            // This represents how many permutations each choice contributes
            int factorial = 1;
            for (int i = 1; i < n - position; i++) {
                factorial *= i;
            }
          
            // Try each number from 1 to n
            for (int number = 1; number <= n; number++) {
                // Skip if number is already used
                if (!used[number]) {
                    // Check if k-th permutation is in the group starting with this number
                    if (k > factorial) {
                        // k-th permutation is not in this group, skip to next group
                        k -= factorial;
                    } else {
                        // k-th permutation starts with this number
                        result.append(number);
                        used[number] = true;
                        break;
                    }
                }
            }
        }
      
        return result.toString();
    }
}