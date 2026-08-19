// Type alias for a pair of integers [min, max]
type IntPair = [number, number];

// Constant representing infinity
const INF = 0x3f3f3f3f;

function maximumGap(nums: number[]): number {
    const n = nums.length;
  
    // Edge case: less than 2 elements
    if (n < 2) {
        return 0;
    }
  
    // Find minimum and maximum values in the array
    let minValue = INF;
    let maxValue = -INF;
    for (const value of nums) {
        minValue = Math.min(minValue, value);
        maxValue = Math.max(maxValue, value);
    }
  
    // Calculate bucket size using pigeonhole principle
    // The maximum gap must be at least (maxValue - minValue) / (n - 1)
    const bucketSize = Math.max(1, Math.floor((maxValue - minValue) / (n - 1)));
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  
    // Initialize buckets: each bucket stores [min, max] values
    const buckets: IntPair[] = Array(bucketCount).fill(null).map(() => [INF, -INF]);
  
    // Distribute numbers into buckets
    for (const value of nums) {
        const bucketIndex = Math.floor((value - minValue) / bucketSize);
        buckets[bucketIndex][0] = Math.min(buckets[bucketIndex][0], value);
        buckets[bucketIndex][1] = Math.max(buckets[bucketIndex][1], value);
    }
  
    // Find maximum gap by comparing adjacent non-empty buckets
    let maxGap = 0;
    let previousMax = minValue;  // Initialize with the minimum value
  
    for (const [currentMin, currentMax] of buckets) {
        // Skip empty buckets (where min > max indicates empty bucket)
        if (currentMin > currentMax) {
            continue;
        }
      
        // Calculate gap between current bucket's min and previous bucket's max
        maxGap = Math.max(maxGap, currentMin - previousMax);
        previousMax = currentMax;
    }
  
    return maxGap;
}
