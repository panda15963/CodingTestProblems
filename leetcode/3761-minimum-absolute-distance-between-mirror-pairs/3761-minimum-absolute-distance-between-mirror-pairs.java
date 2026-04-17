import java.util.*;

class Solution {
    public int minMirrorPairDistance(int[] nums) {
        Map<Integer, Integer> lookup = new HashMap<>();
        int result = Integer.MAX_VALUE;

        for (int i = 0; i < nums.length; i++) {
            if (lookup.containsKey(nums[i])) {
                result = Math.min(result, i - lookup.get(nums[i]));
            }
            lookup.put(reverse(nums[i]), i);
        }

        return result != Integer.MAX_VALUE ? result : -1;
    }

    private int reverse(int n) {
        int result = 0;
        while (n > 0) {
            result = result * 10 + n % 10;
            n /= 10;
        }
        return result;
    }
}