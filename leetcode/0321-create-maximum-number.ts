/**
 * Creates maximum number of length k from two arrays
 * @param nums1 - First input array
 * @param nums2 - Second input array
 * @param k - Length of the result array
 * @returns Maximum number array of length k
 */
function maxNumber(nums1: number[], nums2: number[], k: number): number[] {
    const firstArrayLength: number = nums1.length;
    const secondArrayLength: number = nums2.length;
  
    // Calculate the minimum and maximum number of digits we can take from nums1
    const minDigitsFromFirst: number = Math.max(0, k - secondArrayLength);
    const maxDigitsFromFirst: number = Math.min(k, firstArrayLength);
  
    // Initialize result array with zeros
    let result: number[] = Array(k).fill(0);
  
    // Try all possible combinations of taking x digits from nums1 and (k-x) from nums2
    for (let digitsFromFirst = minDigitsFromFirst; digitsFromFirst <= maxDigitsFromFirst; ++digitsFromFirst) {
        // Get maximum subsequence of length x from nums1
        const subsequence1: number[] = f(nums1, digitsFromFirst);
        // Get maximum subsequence of length (k-x) from nums2
        const subsequence2: number[] = f(nums2, k - digitsFromFirst);
        // Merge the two subsequences to get maximum possible number
        const mergedArray: number[] = merge(subsequence1, subsequence2);
      
        // Update result if current combination is greater
        if (compare(mergedArray, result, 0, 0)) {
            result = mergedArray;
        }
    }
  
    return result;
}

/**
 * Extracts maximum subsequence of length k from array while maintaining order
 * Uses monotonic stack approach
 * @param nums - Input array
 * @param k - Required subsequence length
 * @returns Maximum subsequence of length k
 */
function f(nums: number[], k: number): number[] {
    const arrayLength: number = nums.length;
    // Stack to store the result subsequence
    const stack: number[] = Array(k).fill(0);
    let stackTop: number = -1;
    // Number of elements we can still drop
    let remainingToDrop: number = arrayLength - k;
  
    for (const currentNum of nums) {
        // Pop smaller elements from stack if we can still drop elements
        while (stackTop >= 0 && stack[stackTop] < currentNum && remainingToDrop > 0) {
            --stackTop;
            --remainingToDrop;
        }
      
        // Add current element if stack is not full
        if (stackTop + 1 < k) {
            stack[++stackTop] = currentNum;
        } else {
            // Skip current element if stack is full
            --remainingToDrop;
        }
    }
  
    return stack;
}

/**
 * Compares two arrays lexicographically starting from given indices
 * @param nums1 - First array to compare
 * @param nums2 - Second array to compare
 * @param i - Starting index for nums1
 * @param j - Starting index for nums2
 * @returns True if nums1[i:] > nums2[j:], false otherwise
 */
function compare(nums1: number[], nums2: number[], i: number, j: number): boolean {
    // nums1 exhausted, so nums2 is greater or equal
    if (i >= nums1.length) {
        return false;
    }
    // nums2 exhausted, so nums1 is greater
    if (j >= nums2.length) {
        return true;
    }
    // Compare current elements
    if (nums1[i] > nums2[j]) {
        return true;
    }
    if (nums1[i] < nums2[j]) {
        return false;
    }
    // Elements are equal, compare next positions
    return compare(nums1, nums2, i + 1, j + 1);
}

/**
 * Merges two arrays to create maximum number while maintaining relative order
 * @param nums1 - First array to merge
 * @param nums2 - Second array to merge
 * @returns Merged array forming maximum number
 */
function merge(nums1: number[], nums2: number[]): number[] {
    const firstLength: number = nums1.length;
    const secondLength: number = nums2.length;
    const mergedResult: number[] = Array(firstLength + secondLength).fill(0);
    let firstIndex: number = 0;
    let secondIndex: number = 0;
  
    // Merge arrays by always choosing the lexicographically larger remaining part
    for (let mergedIndex = 0; mergedIndex < firstLength + secondLength; ++mergedIndex) {
        if (compare(nums1, nums2, firstIndex, secondIndex)) {
            mergedResult[mergedIndex] = nums1[firstIndex++];
        } else {
            mergedResult[mergedIndex] = nums2[secondIndex++];
        }
    }
  
    return mergedResult;
}
