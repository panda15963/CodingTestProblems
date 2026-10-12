class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        // Sort intervals by end time in ascending order
        // This greedy approach helps us keep intervals that end earlier
        Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
      
        // Initialize count of intervals to remove (start with total count)
        int intervalsToRemove = intervals.length;
      
        // Track the end time of the last non-overlapping interval kept
        int previousEndTime = Integer.MIN_VALUE;
      
        // Iterate through sorted intervals
        for (int[] currentInterval : intervals) {
            int currentStart = currentInterval[0];
            int currentEnd = currentInterval[1];
          
            // If current interval doesn't overlap with previous kept interval
            if (previousEndTime <= currentStart) {
                // Keep this interval (decrement removal count)
                intervalsToRemove--;
                // Update the end time for next comparison
                previousEndTime = currentEnd;
            }
            // If overlapping, skip current interval (keep the one with earlier end time)
        }
      
        return intervalsToRemove;
    }
}
