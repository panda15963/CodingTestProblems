/**
 * Calculates the sum of digits of a number
 * @param x - The input number
 * @returns The sum of all digits in the number
 */
function f(x: number): number {
    let digitSum = 0;
  
    // Extract each digit and add to sum
    while (x !== 0) {
        digitSum += x % 10;  // Get the last digit
        x = Math.floor(x / 10);  // Remove the last digit
    }
  
    return digitSum;
}

/**
 * Finds the minimum number of swaps needed to sort the array
 * based on digit sum (primary) and value (secondary)
 * @param nums - The input array of numbers
 * @returns The minimum number of swaps required
 */
function minSwaps(nums: number[]): number {
    const n = nums.length;
  
    // Create array of [digitSum, originalValue] pairs
    const digitSumValuePairs: [number, number][] = new Array(n);
    for (let i = 0; i < n; i++) {
        digitSumValuePairs[i] = [f(nums[i]), nums[i]];
    }
  
    // Sort by digit sum first, then by original value if digit sums are equal
    digitSumValuePairs.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];  // Sort by digit sum
        }
        return a[1] - b[1];  // Sort by value if digit sums are equal
    });
  
    // Map each value to its target position in sorted array
    const valueToTargetPosition = new Map<number, number>();
    for (let i = 0; i < n; i++) {
        valueToTargetPosition.set(digitSumValuePairs[i][1], i);
    }
  
    // Track visited positions to find cycles
    const visited: boolean[] = new Array(n).fill(false);
  
    // Count cycles: n elements - number of cycles = minimum swaps
    let cycleCount = 0;
  
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            cycleCount++;
            let currentPosition = i;
          
            // Traverse the cycle
            while (!visited[currentPosition]) {
                visited[currentPosition] = true;
                // Move to where the current element should go
                currentPosition = valueToTargetPosition.get(nums[currentPosition])!;
            }
        }
    }
  
    // Minimum swaps = total elements - number of cycles
    return n - cycleCount;
}
