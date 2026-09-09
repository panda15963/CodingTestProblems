class Solution {
    /**
     * Calculates the H-index using the binary search template.
     * Feasible condition: citations[mid] >= n - mid
     */
    public int hIndex(int[] citations) {
        int n = citations.length;
        if (n == 0) {
            return 0;
        }

        // Binary search template
        int left = 0;
        int right = n - 1;
        int firstTrueIndex = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            // Feasible: does paper at mid have enough citations?
            if (citations[mid] >= n - mid) {
                firstTrueIndex = mid;
                right = mid - 1;  // Search for earlier feasible position
            } else {
                left = mid + 1;
            }
        }

        // Return h-index
        return firstTrueIndex != -1 ? n - firstTrueIndex : 0;
    }
}
