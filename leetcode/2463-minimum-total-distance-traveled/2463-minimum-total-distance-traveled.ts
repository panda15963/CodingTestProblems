type ll = number;

function minimumTotalDistance(robot: number[], factory: number[][]): number {
    // Sort robots and factories by position for optimal assignment
    robot.sort((a, b) => a - b);
    factory.sort((a, b) => a[0] - b[0]);
  
    // dp[i][j] = minimum distance to repair robots from index i onwards using factories from index j onwards
    const dp: ll[][] = Array(robot.length).fill(null).map(() => Array(factory.length).fill(0));
  
    // DFS with memoization to find minimum total distance
    const dfs = (robotIdx: number, factoryIdx: number): ll => {
        // Base case: all robots have been assigned
        if (robotIdx === robot.length) {
            return 0;
        }
      
        // Base case: no more factories available but robots remain
        if (factoryIdx === factory.length) {
            return 1e15;  // Return large value as impossible case
        }
      
        // Return memoized result if already computed
        if (dp[robotIdx][factoryIdx] !== 0) {
            return dp[robotIdx][factoryIdx];
        }
      
        // Option 1: Skip current factory and use remaining factories
        let minDistance: ll = dfs(robotIdx, factoryIdx + 1);
      
        // Option 2: Use current factory for some robots
        let accumulatedDistance: ll = 0;
        const factoryCapacity: number = factory[factoryIdx][1];
        const factoryPosition: number = factory[factoryIdx][0];
      
        // Try assigning k robots to current factory (k from 1 to capacity)
        for (let k = 0; k < factoryCapacity; k++) {
            // Check if we have enough robots remaining
            if (robotIdx + k >= robot.length) {
                break;
            }
          
            // Add distance for current robot to current factory
            accumulatedDistance += Math.abs(robot[robotIdx + k] - factoryPosition);
          
            // Calculate total distance if we assign (k+1) robots to current factory
            // and process remaining robots with remaining factories
            minDistance = Math.min(minDistance, accumulatedDistance + dfs(robotIdx + k + 1, factoryIdx + 1));
        }
      
        // Memoize and return the minimum distance
        dp[robotIdx][factoryIdx] = minDistance;
        return minDistance;
    };
  
    // Start DFS from first robot and first factory
    return dfs(0, 0);
}