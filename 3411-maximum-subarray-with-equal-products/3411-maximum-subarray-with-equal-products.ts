function maxLength(nums: number[]): number {
    // Find the maximum element and LCM of all elements in the array
    // These will be used to establish an upper bound for pruning
    let maxElement = 0;
    let overallLcm = 1;
    for (const num of nums) {
        maxElement = Math.max(maxElement, num);
        overallLcm = lcm(overallLcm, num);
    }
  
    // Calculate the maximum possible product as a pruning threshold
    // If any subarray's product exceeds this, it cannot satisfy the condition
    const maxProduct = overallLcm * maxElement;
  
    const n = nums.length;
    let maxSubarrayLength = 0;
  
    // Try all possible subarrays starting from index i
    for (let i = 0; i < n; i++) {
        let product = 1;  // Product of current subarray
        let gcdValue = 0;  // GCD of current subarray
        let lcmValue = 1;  // LCM of current subarray
      
        // Extend the subarray ending at index j
        for (let j = i; j < n; j++) {
            // Update product, GCD, and LCM for the subarray [i, j]
            product *= nums[j];
            gcdValue = gcd(gcdValue, nums[j]);
            lcmValue = lcm(lcmValue, nums[j]);
          
            // Check if the current subarray satisfies the condition:
            // product of elements = GCD * LCM
            if (product === gcdValue * lcmValue) {
                maxSubarrayLength = Math.max(maxSubarrayLength, j - i + 1);
            }
          
            // Prune: if product exceeds the maximum threshold,
            // no need to extend further from this starting point
            if (product > maxProduct) {
                break;
            }
        }
    }
  
    return maxSubarrayLength;
}

// Helper function to calculate the greatest common divisor (GCD)
function gcd(a: number, b: number): number {
    // Handle edge case where one number is 0
    if (a === 0) return b;
    if (b === 0) return a;
  
    // Euclidean algorithm for GCD
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Helper function to calculate the least common multiple (LCM)
function lcm(a: number, b: number): number {
    // LCM formula: LCM(a, b) = (a * b) / GCD(a, b)
    // Handle edge case to avoid division by zero
    if (a === 0 || b === 0) return 0;
    return Math.floor((a * b) / gcd(a, b));
}
