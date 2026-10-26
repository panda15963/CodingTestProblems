function reversePairs(nums: number[]): number {
    const n = nums.length;
    // Temporary array for merge sort
    const temp: number[] = new Array(n);
  
    // Recursive merge sort function with reverse pairs counting
    const mergeSort = (left: number, right: number): number => {
        // Base case: single element or invalid range
        if (left >= right) {
            return 0;
        }
      
        // Calculate middle point using bit shift for efficiency
        const mid = (left + right) >> 1;
      
        // Recursively count reverse pairs in left and right halves
        let count = mergeSort(left, mid) + mergeSort(mid + 1, right);
      
        // Count reverse pairs across the two halves
        // A reverse pair is when nums[i] > 2 * nums[j] where i < j
        let i = left;
        let j = mid + 1;
        while (i <= mid && j <= right) {
            // Check if current element forms a reverse pair
            // Cast to ensure no overflow when multiplying by 2
            if (nums[i] <= 2 * nums[j]) {
                i++;
            } else {
                // All elements from i to mid form reverse pairs with nums[j]
                count += mid - i + 1;
                j++;
            }
        }
      
        // Merge the two sorted halves
        i = left;
        j = mid + 1;
        let k = 0;
      
        // Merge elements in sorted order into temporary array
        while (i <= mid && j <= right) {
            if (nums[i] <= nums[j]) {
                temp[k++] = nums[i++];
            } else {
                temp[k++] = nums[j++];
            }
        }
      
        // Copy remaining elements from left half
        while (i <= mid) {
            temp[k++] = nums[i++];
        }
      
        // Copy remaining elements from right half
        while (j <= right) {
            temp[k++] = nums[j++];
        }
      
        // Copy sorted elements back to original array
        for (i = left; i <= right; i++) {
            nums[i] = temp[i - left];
        }
      
        return count;
    };
  
    // Start merge sort from the entire array
    return mergeSort(0, n - 1);
}
