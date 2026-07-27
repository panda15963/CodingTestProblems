/**
 * Finds the maximum product of (nums[i] - 1) * (nums[j] - 1) for any two elements in the array
 * @param nums - Array of positive integers
 * @returns Maximum product of (nums[i] - 1) * (nums[j] - 1)
 */
function maxProduct(nums: number[]): number {
    const arrayLength: number = nums.length;
  
    // Perform partial selection sort to find the two largest elements
    // Only need to sort the first two positions
    for (let currentPosition = 0; currentPosition < 2; currentPosition++) {
        let maxElementIndex: number = currentPosition;
      
        // Find the maximum element from the remaining unsorted portion
        for (let searchIndex = currentPosition + 1; searchIndex < arrayLength; searchIndex++) {
            if (nums[searchIndex] > nums[maxElementIndex]) {
                maxElementIndex = searchIndex;
            }
        }
      
        // Swap the maximum element with the current position
        [nums[currentPosition], nums[maxElementIndex]] = [nums[maxElementIndex], nums[currentPosition]];
    }
  
    // Calculate and return the product of (first largest - 1) * (second largest - 1)
    return (nums[0] - 1) * (nums[1] - 1);
}