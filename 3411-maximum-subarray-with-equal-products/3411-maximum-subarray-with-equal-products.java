class Solution {
    /**
     * Finds the maximum length of a subarray where the product equals GCD * LCM.
     * 
     * @param nums the input array of integers
     * @return the maximum length of valid subarray
     */
    public int maxLength(int[] nums) {
        // Calculate the maximum element and LCM of all elements
        // These will be used to determine an upper bound for the product
        int maxElement = 0;
        int overallLcm = 1;
      
        for (int num : nums) {
            maxElement = Math.max(maxElement, num);
            overallLcm = lcm(overallLcm, num);
        }
      
        // Calculate the maximum possible product to avoid overflow
        // and optimize by early termination
        int maxProduct = overallLcm * maxElement;
      
        int n = nums.length;
        int maxLength = 0;
      
        // Try all possible subarrays starting from index i
        for (int i = 0; i < n; ++i) {
            int product = 1;
            int currentGcd = 0;
            int currentLcm = 1;
          
            // Extend the subarray from i to j
            for (int j = i; j < n; ++j) {
                // Update product, GCD, and LCM for the current subarray
                product *= nums[j];
                currentGcd = gcd(currentGcd, nums[j]);
                currentLcm = lcm(currentLcm, nums[j]);
              
                // Check if the current subarray satisfies the condition
                // product = GCD * LCM
                if (product == currentGcd * currentLcm) {
                    maxLength = Math.max(maxLength, j - i + 1);
                }
              
                // Early termination if product exceeds the maximum bound
                if (product > maxProduct) {
                    break;
                }
            }
        }
      
        return maxLength;
    }

    /**
     * Calculates the Greatest Common Divisor (GCD) of two numbers
     * using Euclidean algorithm.
     * 
     * @param a first number
     * @param b second number
     * @return the GCD of a and b
     */
    private int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    /**
     * Calculates the Least Common Multiple (LCM) of two numbers
     * using the formula: LCM(a,b) = a * b / GCD(a,b).
     * 
     * @param a first number
     * @param b second number
     * @return the LCM of a and b
     */
    private int lcm(int a, int b) {
        // Divide first to avoid potential overflow
        return a / gcd(a, b) * b;
    }
}
