class Solution {
    // Store all valid combinations that sum to target
    private List<List<Integer>> result = new ArrayList<>();
    // Store current combination being built
    private List<Integer> currentCombination = new ArrayList<>();
    // Store the candidate numbers array
    private int[] candidates;

    /**
     * Find all unique combinations where the candidate numbers sum to target.
     * The same number may be chosen from candidates an unlimited number of times.
     * 
     * @param candidates Array of distinct integers
     * @param target Target sum to achieve
     * @return List of all unique combinations that sum to target
     */
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Sort candidates to enable early termination in DFS
        Arrays.sort(candidates);
        this.candidates = candidates;
      
        // Start DFS from index 0 with the initial target
        dfs(0, target);
      
        return result;
    }

    /**
     * Depth-first search to find all combinations starting from index startIndex
     * 
     * @param startIndex Starting index in candidates array to avoid duplicates
     * @param remainingTarget Remaining sum needed to reach the target
     */
    private void dfs(int startIndex, int remainingTarget) {
        // Base case: found a valid combination
        if (remainingTarget == 0) {
            result.add(new ArrayList<>(currentCombination));
            return;
        }
      
        // Early termination: remaining target is less than smallest available candidate
        if (remainingTarget < candidates[startIndex]) {
            return;
        }
      
        // Try each candidate starting from startIndex
        for (int i = startIndex; i < candidates.length; ++i) {
            // Add current candidate to the combination
            currentCombination.add(candidates[i]);
          
            // Recursively search with the same starting index (allowing reuse)
            // and reduced target
            dfs(i, remainingTarget - candidates[i]);
          
            // Backtrack: remove the last added candidate
            currentCombination.remove(currentCombination.size() - 1);
        }
    }
}