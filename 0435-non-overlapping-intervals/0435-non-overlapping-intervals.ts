/**
 * Finds the minimum number of intervals to remove to make all intervals non-overlapping
 * @param intervals - Array of intervals where each interval is [start, end]
 * @returns The minimum number of intervals that need to be removed
 */
function eraseOverlapIntervals(intervals: number[][]): number {
    // Sort intervals by their end time in ascending order
    // This greedy approach ensures we keep intervals that end earliest
    intervals.sort((a, b) => a[1] - b[1]);
  
    // Initialize count as total intervals (assume all need to be removed)
    // Initialize previousEnd to track the end time of the last kept interval
    let removalCount: number = intervals.length;
    let previousEnd: number = -Infinity;
  
    // Iterate through sorted intervals
    for (const [currentStart, currentEnd] of intervals) {
        // If current interval doesn't overlap with the previous kept interval
        if (previousEnd <= currentStart) {
            // Keep this interval (decrement removal count)
            removalCount--;
            // Update the end time of the last kept interval
            previousEnd = currentEnd;
        }
        // If intervals overlap, skip current interval (keep removal count as is)
    }
  
    return removalCount;
}
