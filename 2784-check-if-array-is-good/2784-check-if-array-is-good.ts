/**
 * Checks if an array is "good" according to specific criteria:
 * - The array should contain exactly n+1 elements where n is the largest element
 * - Elements from 1 to n-1 should appear exactly once
 * - Element n should appear exactly twice
 * 
 * @param nums - The input array of numbers to check
 * @returns true if the array is "good", false otherwise
 */
function isGood(nums: number[]): boolean {
    // Calculate n as the expected maximum value (array length - 1)
    const n: number = nums.length - 1;
  
    // Initialize frequency counter array with 201 elements (covering range 0-200)
    const frequencyCount: number[] = Array(201).fill(0);
  
    // Count the frequency of each number in the input array
    for (const num of nums) {
        frequencyCount[num]++;
    }
  
    // Check if the maximum value n appears exactly twice
    if (frequencyCount[n] !== 2) {
        return false;
    }
  
    // Check if all values from 1 to n-1 appear exactly once
    for (let i = 1; i < n; i++) {
        if (frequencyCount[i] !== 1) {
            return false;
        }
    }
  
    // All conditions are satisfied, the array is "good"
    return true;
}
