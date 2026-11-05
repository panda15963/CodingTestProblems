class Solution {
    public int findTheDistanceValue(int[] arr1, int[] arr2, int d) {
        // Sort arr2 to enable binary search
        Arrays.sort(arr2);

        // Counter for elements in arr1 that satisfy the distance condition
        int count = 0;

        // Check each element in arr1
        for (int element : arr1) {
            // Binary search for the smallest element >= (element - d) in arr2
            // This finds the potential lower bound of the range [element - d, element + d]
            int searchKey = element - d;
            int index = Arrays.binarySearch(arr2, searchKey);

            // Convert negative insertion point to actual index
            // If not found, binarySearch returns (-(insertion point) - 1)
            // We need the insertion point, which is where the element would be inserted
            if (index < 0) {
                index = -index - 1;
            }

            // Check if there's no element in arr2 within the range [element - d, element + d]
            // Two conditions for a valid distance value:
            // 1. index == arr2.length: all elements in arr2 are less than (element - d)
            // 2. arr2[index] > element + d: the smallest element >= (element - d) is also > (element + d)
            if (index == arr2.length || arr2[index] > element + d) {
                count++;
            }
        }

        return count;
    }
}
