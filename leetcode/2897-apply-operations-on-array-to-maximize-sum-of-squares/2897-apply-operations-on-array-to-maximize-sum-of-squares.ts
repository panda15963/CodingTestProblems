/**
 * Calculates the maximum sum of squares by optimally distributing bits
 * @param nums - Array of non-negative integers
 * @param k - Number of elements to construct
 * @returns Maximum sum of k squared numbers modulo 10^9 + 7
 */
function maxSum(nums: number[], k: number): number {
    // Array to count the number of set bits at each position (0-30)
    const bitCount: number[] = Array(31).fill(0);
  
    // Count set bits at each position across all numbers
    for (const num of nums) {
        for (let bitPosition = 0; bitPosition < 31; bitPosition++) {
            // Check if bit at current position is set
            if ((num >> bitPosition) & 1) {
                bitCount[bitPosition]++;
            }
        }
    }
  
    // Initialize answer as BigInt to handle large numbers
    let answer: bigint = 0n;
    const MOD: number = 1e9 + 7;
  
    // Construct k numbers to maximize the sum of their squares
    while (k-- > 0) {
        let constructedNumber: number = 0;
      
        // Build a number by taking available bits from highest value positions
        for (let bitPosition = 0; bitPosition < 31; bitPosition++) {
            // If there are available bits at this position, use one
            if (bitCount[bitPosition] > 0) {
                constructedNumber |= (1 << bitPosition);
                bitCount[bitPosition]--;
            }
        }
      
        // Add the square of the constructed number to the answer
        answer = (answer + BigInt(constructedNumber) * BigInt(constructedNumber)) % BigInt(MOD);
    }
  
    return Number(answer);
}
