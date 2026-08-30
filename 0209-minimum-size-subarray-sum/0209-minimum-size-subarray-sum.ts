/**
 * Finds the minimal length of a contiguous subarray with sum >= target
 * @param target - The target sum to achieve or exceed
 * @param nums - Array of positive integers
 * @returns The minimal length of subarray, or 0 if no such subarray exists
 */
function minSubArrayLen(target: number, nums: number[]): number {
  const n: number = nums.length;

  // Build prefix sum array where prefixSum[i] = sum of nums[0...i-1]
  const prefixSum: number[] = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + nums[i];
  }

  // Initialize answer with impossible value (n + 1)
  let minLength: number = n + 1;

  // For each starting position i, find the smallest ending position j
  // such that sum of nums[i...j-1] >= target
  for (let i = 0; i <= n; i++) {
    // Binary search template to find first j where prefixSum[j] >= prefixSum[i] + target
    let left: number = i;
    let right: number = n;
    let firstTrueIndex: number = -1;

    while (left <= right) {
      const mid: number = Math.floor((left + right) / 2);
      if (prefixSum[mid] >= prefixSum[i] + target) {
        firstTrueIndex = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    // If valid subarray found, update minimum length
    if (firstTrueIndex !== -1) {
      minLength = Math.min(minLength, firstTrueIndex - i);
    }
  }

  // Return 0 if no valid subarray found, otherwise return minimum length
  return minLength === n + 1 ? 0 : minLength;
}
