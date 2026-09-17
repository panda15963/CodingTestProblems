/**
 * Wiggle sort function that rearranges the array such that nums[0] < nums[1] > nums[2] < nums[3]...
 * Uses bucket sort approach to achieve the wiggle pattern
 * @param nums - The input array to be sorted in wiggle pattern
 * @return void - Modifies the array in-place
 */
function wiggleSort(nums: number[]): void {
    // Create a bucket array to count frequency of each number (0 to 5000)
    const bucket: number[] = new Array(5001).fill(0);
  
    // Count the frequency of each number in the input array
    for (const value of nums) {
        bucket[value]++;
    }
  
    const arrayLength: number = nums.length;
    let currentIndex: number = 5000;
  
    // Fill odd indices with larger numbers from the bucket (descending order)
    // This ensures nums[1], nums[3], nums[5]... get larger values
    for (let i = 1; i < arrayLength; i += 2) {
        // Skip empty buckets
        while (bucket[currentIndex] === 0) {
            currentIndex--;
        }
        nums[i] = currentIndex;
        bucket[currentIndex]--;
    }
  
    // Fill even indices with remaining numbers from the bucket (still descending)
    // This ensures nums[0], nums[2], nums[4]... get smaller values than odd indices
    for (let i = 0; i < arrayLength; i += 2) {
        // Skip empty buckets
        while (bucket[currentIndex] === 0) {
            currentIndex--;
        }
        nums[i] = currentIndex;
        bucket[currentIndex]--;
    }
}
