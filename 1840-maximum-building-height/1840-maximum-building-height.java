class Solution {
    public int maxBuilding(int n, int[][] restrictions) {
        // Create a list to store all restrictions including boundaries
        List<int[]> restrictionList = new ArrayList<>();
      
        // Add all given restrictions to the list
        restrictionList.addAll(Arrays.asList(restrictions));
      
        // Add the starting position (position 1 with height 0)
        restrictionList.add(new int[] {1, 0});
      
        // Sort restrictions by position (ascending order)
        Collections.sort(restrictionList, (a, b) -> a[0] - b[0]);
      
        // Add the ending position if not already present
        // The maximum height at position n is n-1 (if no other restrictions)
        if (restrictionList.get(restrictionList.size() - 1)[0] != n) {
            restrictionList.add(new int[] {n, n - 1});
        }
      
        int totalRestrictions = restrictionList.size();
      
        // Forward pass: propagate height constraints from left to right
        // Each building's height is limited by the previous building's height + distance
        for (int i = 1; i < totalRestrictions; ++i) {
            int[] previousRestriction = restrictionList.get(i - 1);
            int[] currentRestriction = restrictionList.get(i);
            int distance = currentRestriction[0] - previousRestriction[0];
            currentRestriction[1] = Math.min(currentRestriction[1], 
                                            previousRestriction[1] + distance);
        }
      
        // Backward pass: propagate height constraints from right to left
        // Ensure consistency by checking constraints in reverse direction
        for (int i = totalRestrictions - 2; i > 0; --i) {
            int[] currentRestriction = restrictionList.get(i);
            int[] nextRestriction = restrictionList.get(i + 1);
            int distance = nextRestriction[0] - currentRestriction[0];
            currentRestriction[1] = Math.min(currentRestriction[1], 
                                            nextRestriction[1] + distance);
        }
      
        // Calculate the maximum achievable height between consecutive restrictions
        int maxHeight = 0;
        for (int i = 0; i < totalRestrictions - 1; ++i) {
            int[] leftRestriction = restrictionList.get(i);
            int[] rightRestriction = restrictionList.get(i + 1);
          
            // Calculate peak height between two restrictions
            // Peak occurs at: (leftHeight + rightHeight + distance) / 2
            int distance = rightRestriction[0] - leftRestriction[0];
            int peakHeight = (leftRestriction[1] + rightRestriction[1] + distance) / 2;
            maxHeight = Math.max(maxHeight, peakHeight);
        }
      
        return maxHeight;
    }
}