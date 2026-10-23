/**
 * Calculates the total Hamming distance between all pairs of integers in the array.
 * The Hamming distance between two integers is the number of positions at which 
 * the corresponding bits are different.
 * 
 * @param nums - Array of integers to calculate total Hamming distance
 * @returns The sum of Hamming distances between all pairs
 */
function totalHammingDistance(nums: number[]): number {
    let totalDistance: number = 0;
  
    // Check each bit position (0 to 31 for 32-bit integers)
    for (let bitPosition: number = 0; bitPosition < 32; bitPosition++) {
        // Count how many numbers have bit set to 1 at current position
        const onesCount: number = nums.filter((num: number) => 
            (num >> bitPosition) & 1
        ).length;
      
        // Count how many numbers have bit set to 0 at current position
        const zerosCount: number = nums.length - onesCount;
      
        // For this bit position, the contribution to total Hamming distance
        // is the product of numbers with 1s and numbers with 0s
        // (each 1 differs from each 0 at this position)
        totalDistance += onesCount * zerosCount;
    }
  
    return totalDistance;
}
