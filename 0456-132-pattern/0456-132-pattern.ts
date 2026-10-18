/**
 * Finds if there exists a 132 pattern in the array.
 * A 132 pattern is a subsequence of three integers nums[i], nums[j], nums[k] 
 * such that i < j < k and nums[i] < nums[k] < nums[j].
 * 
 * @param nums - The input array of numbers
 * @returns true if a 132 pattern exists, false otherwise
 */
function find132pattern(nums: number[]): boolean {
    // Variable to track the maximum value of nums[k] in the 132 pattern
    // where nums[k] is the middle value (less than nums[j] but greater than nums[i])
    let maxMiddleValue: number = -Infinity;
  
    // Stack to maintain potential nums[j] values (the peak of 132 pattern)
    // in decreasing order from bottom to top
    const stack: number[] = [];
  
    // Traverse the array from right to left
    for (let i: number = nums.length - 1; i >= 0; i--) {
        // If current element is less than maxMiddleValue,
        // we found a valid 132 pattern (current element is nums[i])
        if (nums[i] < maxMiddleValue) {
            return true;
        }
      
        // Pop elements from stack that are smaller than current element
        // These popped elements become potential nums[k] values
        while (stack.length > 0 && stack[stack.length - 1] < nums[i]) {
            // Update maxMiddleValue with the popped value
            // This ensures we track the largest possible nums[k]
            maxMiddleValue = stack.pop()!;
        }
      
        // Push current element to stack as a potential nums[j] value
        stack.push(nums[i]);
    }
  
    // No 132 pattern found in the array
    return false;
}
