/**
 * Finds two unique numbers in an array where all other numbers appear exactly twice.
 * Uses XOR properties to separate the two unique numbers.
 * 
 * @param nums - Array containing numbers where exactly two numbers appear once and others appear twice
 * @returns Array containing the two unique numbers
 */
function singleNumber(nums: number[]): number[] {
    // XOR all numbers to get the XOR of the two unique numbers
    // Since duplicate numbers cancel out (x ^ x = 0), we get uniqueNum1 ^ uniqueNum2
    const xorOfTwoUniques: number = nums.reduce((accumulator, current) => accumulator ^ current);
  
    // Find the rightmost set bit in the XOR result
    // This bit must be different between the two unique numbers
    // Using two's complement: -x flips all bits and adds 1, & with x isolates rightmost set bit
    const rightmostSetBit: number = xorOfTwoUniques & -xorOfTwoUniques;
  
    // Partition numbers into two groups based on the rightmost set bit
    // One group will contain one unique number, the other group will contain the other
    let firstUniqueNumber: number = 0;
    for (const num of nums) {
        // If this bit is set in the current number, XOR it with firstUniqueNumber
        // Duplicates in this group will cancel out, leaving only one unique number
        if (num & rightmostSetBit) {
            firstUniqueNumber ^= num;
        }
    }
  
    // The second unique number can be obtained by XORing the first unique number with xorOfTwoUniques
    // Since xorOfTwoUniques = firstUniqueNumber ^ secondUniqueNumber
    // Therefore: secondUniqueNumber = xorOfTwoUniques ^ firstUniqueNumber
    const secondUniqueNumber: number = xorOfTwoUniques ^ firstUniqueNumber;
  
    return [firstUniqueNumber, secondUniqueNumber];
}
