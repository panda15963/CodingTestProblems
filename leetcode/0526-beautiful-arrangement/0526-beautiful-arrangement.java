class Solution {
    // Total number of elements to arrange
    private int n;
    // Counter for valid beautiful arrangements
    private int count;
    // Visited array to track which numbers have been used
    private boolean[] visited;
    // Map storing valid number pairs where key can be placed at position value
    private Map<Integer, List<Integer>> validPairs;

    /**
     * Counts the number of beautiful arrangements for numbers 1 to n
     * A beautiful arrangement means for every position i (1-indexed),
     * either number[i] is divisible by i or i is divisible by number[i]
     * 
     * @param n the upper bound of numbers to arrange
     * @return the count of beautiful arrangements
     */
    public int countArrangement(int n) {
        this.n = n;
        this.count = 0;
        this.visited = new boolean[n + 1]; // 1-indexed array
        this.validPairs = new HashMap<>();
      
        // Precompute all valid pairs (position, number)
        // For each position i, find all numbers j that can be placed at position i
        for (int position = 1; position <= n; position++) {
            for (int number = 1; number <= n; number++) {
                // Check if number can be placed at this position
                if (position % number == 0 || number % position == 0) {
                    validPairs.computeIfAbsent(position, k -> new ArrayList<>()).add(number);
                }
            }
        }
      
        // Start DFS from position 1
        dfs(1);
        return count;
    }

    /**
     * Depth-first search to find all valid beautiful arrangements
     * 
     * @param position the current position being filled (1-indexed)
     */
    private void dfs(int position) {
        // Base case: all positions have been filled successfully
        if (position == n + 1) {
            count++;
            return;
        }
      
        // No valid numbers for this position (shouldn't happen with proper input)
        if (!validPairs.containsKey(position)) {
            return;
        }
      
        // Try placing each valid number at the current position
        for (int number : validPairs.get(position)) {
            // Only use numbers that haven't been placed yet
            if (!visited[number]) {
                // Mark number as used
                visited[number] = true;
                // Recursively fill the next position
                dfs(position + 1);
                // Backtrack: unmark the number for other arrangements
                visited[number] = false;
            }
        }
    }
}
