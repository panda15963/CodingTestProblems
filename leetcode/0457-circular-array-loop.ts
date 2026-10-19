/**
 * Detects if there exists a circular loop in the array following movement rules
 * @param nums - Array where each element represents jump distance and direction
 * @returns true if a valid circular loop exists, false otherwise
 */
function circularArrayLoop(nums: number[]): boolean {
    const n = nums.length;
  
    // Try each position as a potential starting point for a cycle
    for (let i = 0; i < n; i++) {
        // Skip if already visited (marked as 0)
        if (nums[i] === 0) continue;
      
        // Initialize slow and fast pointers for cycle detection
        let slow = i;
        let fast = getNextIndex(nums, i);
      
        // Continue while all movements are in the same direction
        // Check: current slow direction matches fast direction
        // AND current slow direction matches next position after fast
        while (nums[slow] * nums[fast] > 0 && 
               nums[slow] * nums[getNextIndex(nums, fast)] > 0) {
          
            // Cycle detected when slow meets fast
            if (slow === fast) {
                // Verify it's not a single-element cycle
                if (slow !== getNextIndex(nums, slow)) {
                    return true;
                }
                break;
            }
          
            // Move slow pointer one step
            slow = getNextIndex(nums, slow);
            // Move fast pointer two steps
            fast = getNextIndex(nums, getNextIndex(nums, fast));
        }
      
        // Mark all elements in this path as visited (set to 0)
        // This optimization prevents revisiting invalid paths
        let currentIndex = i;
        while (nums[currentIndex] * nums[getNextIndex(nums, currentIndex)] > 0) {
            const nextIndex = getNextIndex(nums, currentIndex);
            nums[currentIndex] = 0;
            currentIndex = nextIndex;
        }
    }
  
    return false;
}

/**
 * Calculate the next index in the circular array
 * Handles both positive and negative jumps with wraparound
 * @param nums - The array containing jump values
 * @param currentIndex - Current position in the array
 * @returns The next index after applying the jump
 */
function getNextIndex(nums: number[], currentIndex: number): number {
    const n = nums.length;
    // Use modulo arithmetic to handle circular wraparound
    // Add n before final modulo to handle negative values correctly
    return ((currentIndex + nums[currentIndex]) % n + n) % n;
}
