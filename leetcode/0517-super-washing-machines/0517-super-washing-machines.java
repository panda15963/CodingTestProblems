class Solution {
    public int findMinMoves(int[] machines) {
        int machineCount = machines.length;
      
        // Calculate total number of dresses across all machines
        int totalDresses = 0;
        for (int dresses : machines) {
            totalDresses += dresses;
        }
      
        // Check if equal distribution is possible
        if (totalDresses % machineCount != 0) {
            return -1;
        }
      
        // Calculate target number of dresses per machine
        int targetPerMachine = totalDresses / machineCount;
      
        // Track the cumulative flow of dresses and find maximum moves needed
        int cumulativeFlow = 0;
        int maxMoves = 0;
      
        for (int currentDresses : machines) {
            // Calculate excess/deficit for current machine
            int excess = currentDresses - targetPerMachine;
          
            // Update cumulative flow (net dresses that need to pass through)
            cumulativeFlow += excess;
          
            // Maximum moves is determined by:
            // 1. Absolute cumulative flow (dresses passing through from left/right)
            // 2. Excess at current machine (if positive, it needs to give out that many)
            maxMoves = Math.max(maxMoves, Math.max(Math.abs(cumulativeFlow), excess));
        }
      
        return maxMoves;
    }
}
