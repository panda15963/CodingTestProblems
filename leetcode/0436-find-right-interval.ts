/**
 * Finds the right interval for each interval in the given array.
 * The right interval for an interval i is an interval j such that start[j] >= end[i] 
 * and start[j] is minimized.
 * 
 * @param intervals - Array of intervals where each interval is [start, end]
 * @returns Array of indices of right intervals, -1 if no right interval exists
 */
function findRightInterval(intervals: number[][]): number[] {
    const intervalCount: number = intervals.length;
  
    // Create array of [startTime, originalIndex] pairs for binary search
    const startIndexPairs: number[][] = Array.from(
        { length: intervalCount }, 
        (_, index) => [intervals[index][0], index]
    );
  
    // Sort by start time in ascending order
    startIndexPairs.sort((a, b) => a[0] - b[0]);
  
    // For each interval, find the smallest start time >= its end time
    return intervals.map(([startTime, endTime]) => {
        let left: number = 0;
        let right: number = intervalCount;
      
        // Binary search for the leftmost position where start >= endTime
        while (left < right) {
            const mid: number = (left + right) >> 1; // Equivalent to Math.floor((left + right) / 2)
          
            if (startIndexPairs[mid][0] >= endTime) {
                // Found a valid start, try to find a smaller one
                right = mid;
            } else {
                // Start is too small, search in the right half
                left = mid + 1;
            }
        }
      
        // Return the original index if found, otherwise -1
        return left < intervalCount ? startIndexPairs[left][1] : -1;
    });
}
