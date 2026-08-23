/**
 * Given a list of non-negative integers, arrange them to form the largest number.
 * @param nums - Array of non-negative integers to arrange
 * @returns The largest number as a string
 */
function largestNumber(nums: number[]): string {
    // Sort numbers based on which combination produces a larger value
    // Compare by concatenating in different orders (a+b vs b+a)
    nums.sort((a: number, b: number) => {
        // Convert numbers to strings for concatenation
        const combinationAB: string = String(a) + String(b);
        const combinationBA: string = String(b) + String(a);
      
        // Sort in descending order by comparing concatenated values
        // Convert back to numbers for comparison
        return Number(combinationBA) - Number(combinationAB);
    });
  
    // Handle edge case: if the largest number is 0, all numbers are 0
    // Return "0" instead of "000...0"
    if (nums[0] === 0) {
        return '0';
    }
  
    // Join all sorted numbers into a single string
    return nums.join('');
}
