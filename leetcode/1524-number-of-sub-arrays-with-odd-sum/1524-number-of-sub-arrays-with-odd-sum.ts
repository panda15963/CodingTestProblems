/**
 * Counts the number of subarrays with odd sum
 * @param arr - The input array of numbers
 * @returns The count of subarrays with odd sum, modulo 10^9 + 7
 */
function numOfSubarrays(arr: number[]): number {
    let result: number = 0;
    let prefixSum: number = 0;
  
    // Track count of even and odd prefix sums
    // evenOddCount[0] = count of even prefix sums
    // evenOddCount[1] = count of odd prefix sums
    // Initialize with [1, 0] since empty prefix has sum 0 (even)
    const evenOddCount: number[] = [1, 0];
  
    const MOD: number = 1e9 + 7;
  
    for (const num of arr) {
        // Update the running prefix sum
        prefixSum += num;
      
        // Get the parity of current prefix sum (0 for even, 1 for odd)
        const currentParity: number = prefixSum & 1;
      
        // To get odd sum subarray, we need:
        // - If current prefix sum is odd, pair with even prefix sums
        // - If current prefix sum is even, pair with odd prefix sums
        // XOR with 1 flips the parity (0^1=1, 1^1=0)
        const oppositeParity: number = currentParity ^ 1;
      
        // Add count of prefix sums with opposite parity
        result = (result + evenOddCount[oppositeParity]) % MOD;
      
        // Increment count for current prefix sum parity
        evenOddCount[currentParity]++;
    }
  
    return result;
}
