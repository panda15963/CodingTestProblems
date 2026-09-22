class SummaryRanges {
    // TreeMap to store intervals, key is the start of interval, value is [start, end]
    private TreeMap<Integer, int[]> intervalMap;

    /**
     * Initialize the data structure
     */
    public SummaryRanges() {
        intervalMap = new TreeMap<>();
    }

    /**
     * Add a number to the data stream and merge intervals if necessary
     * @param val the number to be added
     */
    public void addNum(int val) {
        // Find the largest key that is less than or equal to val
        Integer leftKey = intervalMap.floorKey(val);
        // Find the smallest key that is greater than or equal to val
        Integer rightKey = intervalMap.ceilingKey(val);
      
        // Case 1: val connects two adjacent intervals - merge them
        if (leftKey != null && rightKey != null && 
            intervalMap.get(leftKey)[1] + 1 == val && 
            intervalMap.get(rightKey)[0] - 1 == val) {
          
            // Extend left interval to include right interval's end
            intervalMap.get(leftKey)[1] = intervalMap.get(rightKey)[1];
            // Remove the right interval as it's now merged
            intervalMap.remove(rightKey);
        }
        // Case 2: val can extend or is within the left interval
        else if (leftKey != null && val <= intervalMap.get(leftKey)[1] + 1) {
            // Extend the end of left interval if necessary
            intervalMap.get(leftKey)[1] = Math.max(val, intervalMap.get(leftKey)[1]);
        }
        // Case 3: val can extend or is within the right interval
        else if (rightKey != null && val >= intervalMap.get(rightKey)[0] - 1) {
            // Extend the start of right interval if necessary
            intervalMap.get(rightKey)[0] = Math.min(val, intervalMap.get(rightKey)[0]);
        }
        // Case 4: val is isolated - create a new interval
        else {
            intervalMap.put(val, new int[] {val, val});
        }
    }

    /**
     * Return the current intervals as a 2D array
     * @return array of intervals where each interval is [start, end]
     */
    public int[][] getIntervals() {
        int[][] result = new int[intervalMap.size()][2];
        int index = 0;
      
        // Copy all intervals from the map to the result array
        for (int[] interval : intervalMap.values()) {
            result[index++] = interval;
        }
      
        return result;
    }
}

/**
 * Your SummaryRanges object will be instantiated and called as such:
 * SummaryRanges obj = new SummaryRanges();
 * obj.addNum(val);
 * int[][] param_2 = obj.getIntervals();
 */
