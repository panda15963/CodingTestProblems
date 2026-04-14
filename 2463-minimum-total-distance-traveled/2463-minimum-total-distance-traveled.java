class Solution {
    // Memoization table: dp[i][j] represents minimum distance for robots starting from index i
    // and factories starting from index j
    private long[][] dp;
    private List<Integer> robotPositions;
    private int[][] factoryData;

    public long minimumTotalDistance(List<Integer> robot, int[][] factory) {
        // Sort robots and factories by position for optimal assignment
        Collections.sort(robot);
        Arrays.sort(factory, (a, b) -> Integer.compare(a[0], b[0]));
      
        // Initialize instance variables
        this.robotPositions = robot;
        this.factoryData = factory;
        this.dp = new long[robot.size()][factory.length];
      
        // Start DFS from first robot and first factory
        return dfs(0, 0);
    }

    /**
     * Recursively find minimum total distance to repair robots
     * @param robotIndex current robot index to be assigned
     * @param factoryIndex current factory index being considered
     * @return minimum total distance for remaining robots
     */
    private long dfs(int robotIndex, int factoryIndex) {
        // Base case: all robots have been assigned
        if (robotIndex == robotPositions.size()) {
            return 0;
        }
      
        // Base case: no more factories available but robots remain
        if (factoryIndex == factoryData.length) {
            return Long.MAX_VALUE / 1000; // Return large value to indicate invalid path
        }
      
        // Check memoization table
        if (dp[robotIndex][factoryIndex] != 0) {
            return dp[robotIndex][factoryIndex];
        }
      
        // Option 1: Skip current factory and try next one
        long minDistance = dfs(robotIndex, factoryIndex + 1);
      
        // Option 2: Assign robots to current factory
        long currentDistance = 0;
        int factoryCapacity = factoryData[factoryIndex][1];
        int factoryPosition = factoryData[factoryIndex][0];
      
        // Try assigning k robots to current factory (k from 1 to capacity)
        for (int k = 0; k < factoryCapacity; k++) {
            // Check if we have enough robots remaining
            if (robotIndex + k >= robotPositions.size()) {
                break;
            }
          
            // Add distance for current robot to factory
            currentDistance += Math.abs(robotPositions.get(robotIndex + k) - factoryPosition);
          
            // Recursively calculate minimum distance for remaining robots and factories
            long remainingDistance = dfs(robotIndex + k + 1, factoryIndex + 1);
          
            // Update minimum distance
            minDistance = Math.min(minDistance, currentDistance + remainingDistance);
        }
      
        // Store result in memoization table
        dp[robotIndex][factoryIndex] = minDistance;
        return minDistance;
    }
}