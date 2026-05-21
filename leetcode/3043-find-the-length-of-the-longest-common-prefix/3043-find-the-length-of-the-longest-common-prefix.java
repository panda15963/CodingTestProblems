import java.util.HashSet;
import java.util.Set;

class Solution {
    public int longestCommonPrefix(int[] arr1, int[] arr2) {
        Set<Integer> prefixSet = new HashSet<>();

        // 1. Insert all prefixes of arr1 numbers into the set
        for (int num : arr1) {
            while (num > 0) {
                prefixSet.add(num);
                num /= 10;
            }
        }

        int maxLength = 0;

        // 2. Check prefixes of arr2 numbers against the set
        for (int num : arr2) {
            while (num > 0) {
                if (prefixSet.contains(num)) {
                    // Convert the matched number to a string to get its length
                    int length = String.valueOf(num).length();
                    maxLength = Math.max(maxLength, length);
                    break; // No need to check shorter prefixes for this number
                }
                num /= 10;
            }
        }

        return maxLength;
    }
}
