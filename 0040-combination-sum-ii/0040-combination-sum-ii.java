class Solution {
    // Store all valid combinations that sum to target
    private List<List<Integer>> result = new ArrayList<>();
    // Store current combination being explored
    private List<Integer> currentCombination = new ArrayList<>();
    // Store the input candidates array
    private int[] candidates;

    /**
     * Find all unique combinations where candidate numbers sum to target.
     * Each number in candidates may only be used once in the combination.
     * 
     * @param candidates array of candidate numbers (may contain duplicates)
     * @param target target sum to achieve
     * @return list of all unique combinations that sum to target
     */
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        // Sort array to handle duplicates and enable early termination
        Arrays.sort(candidates);
        this.candidates = candidates;
      
        // Start DFS from index 0 with initial target sum
        backtrack(0, target);
      
        return result;
    }

    /**
     * Recursive backtracking to find all valid combinations.
     * 
     * @param startIndex current index in candidates array to start from
     * @param remainingSum remaining sum needed to reach target
     */
    private void backtrack(int startIndex, int remainingSum) {
        // Base case: found a valid combination
        if (remainingSum == 0) {
            result.add(new ArrayList<>(currentCombination));
            return;
        }
      
        // Pruning: stop if we've exhausted all candidates or 
        // remaining sum is less than smallest available candidate
        if (startIndex >= candidates.length || remainingSum < candidates[startIndex]) {
            return;
        }
      
        // Try each candidate starting from startIndex
        for (int index = startIndex; index < candidates.length; index++) {
            // Skip duplicates to avoid duplicate combinations
            // Only skip if it's not the first element in this recursion level
            if (index > startIndex && candidates[index] == candidates[index - 1]) {
                continue;
            }
          
            // Include current candidate in the combination
            currentCombination.add(candidates[index]);
          
            // Recursively explore with updated parameters
            // Move to next index (index + 1) since each element can only be used once
            backtrack(index + 1, remainingSum - candidates[index]);
          
            // Backtrack: remove the last added element to try other possibilities
            currentCombination.remove(currentCombination.size() - 1);
        }
    }
}
