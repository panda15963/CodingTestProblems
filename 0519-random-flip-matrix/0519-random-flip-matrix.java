class Solution {
    private int rows;
    private int cols;
    private int remainingCells;
    private Random random = new Random();
    // Map to handle the virtual swap of flipped cells with the last available cell
    private Map<Integer, Integer> swapMap = new HashMap<>();

    /**
     * Initialize the matrix with given dimensions
     * @param m number of rows
     * @param n number of columns
     */
    public Solution(int m, int n) {
        this.rows = m;
        this.cols = n;
        this.remainingCells = m * n;
    }

    /**
     * Flip a random cell in the matrix that hasn't been flipped yet
     * Uses Fisher-Yates shuffle algorithm to ensure uniform randomness
     * @return array containing [row, column] of the flipped cell
     */
    public int[] flip() {
        // Generate random index from remaining cells
        int randomIndex = random.nextInt(remainingCells);
        remainingCells--;
      
        // Get the actual index to flip (either the mapped value or the original index)
        int actualIndex = swapMap.getOrDefault(randomIndex, randomIndex);
      
        // Swap the used index with the last available index to maintain continuity
        // This ensures we can still access all unflipped cells with indices [0, remainingCells-1]
        swapMap.put(randomIndex, swapMap.getOrDefault(remainingCells, remainingCells));
      
        // Convert 1D index to 2D coordinates
        int row = actualIndex / cols;
        int col = actualIndex % cols;
      
        return new int[] {row, col};
    }

    /**
     * Reset the matrix to its initial state where all cells can be flipped again
     */
    public void reset() {
        remainingCells = rows * cols;
        swapMap.clear();
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(m, n);
 * int[] param_1 = obj.flip();
 * obj.reset();
 */
