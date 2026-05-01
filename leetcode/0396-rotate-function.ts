/**
 * Calculates the maximum value of the rotation function F(k) for all possible rotations
 * F(k) = 0 * arrk[0] + 1 * arrk[1] + ... + (n-1) * arrk[n-1]
 * where arrk is the array after rotating k positions clockwise
 * 
 * @param nums - Input array of numbers
 * @returns Maximum value among all rotation functions
 */
function maxRotateFunction(nums: number[]): number {
    const arrayLength: number = nums.length;
  
    // Calculate the sum of all elements in the array
    const totalSum: number = nums.reduce((accumulator, value) => accumulator + value, 0);
  
    // Calculate F(0) = 0*nums[0] + 1*nums[1] + ... + (n-1)*nums[n-1]
    let currentRotationValue: number = nums.reduce((accumulator, value, index) => accumulator + value * index, 0);
  
    // Initialize the maximum value with F(0)
    let maxValue: number = currentRotationValue;
  
    // Calculate F(k) for k from 1 to n-1 using the relationship:
    // F(k) = F(k-1) + totalSum - n * nums[n-k]
    // This formula is derived from the pattern when rotating the array
    for (let rotation = 1; rotation < arrayLength; rotation++) {
        // Update current rotation value using the mathematical relationship
        // F(k) = F(k-1) - (totalSum - nums[k-1]) + nums[k-1] * (n-1)
        // Simplified: F(k) = F(k-1) + totalSum - n * nums[n-k]
        currentRotationValue = currentRotationValue - (totalSum - nums[rotation - 1]) + nums[rotation - 1] * (arrayLength - 1);
      
        // Update maximum value if current rotation yields a larger value
        maxValue = Math.max(maxValue, currentRotationValue);
    }
  
    return maxValue;
}