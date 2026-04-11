import java.util.*;

class Solution {
    public int minimumDistance(int[] nums) {
        Map<Integer, ArrayList<Integer>> pos = new HashMap<>();
        int ans = Integer.MAX_VALUE;

        for (int i = 0; i < nums.length; i++) {
            int x = nums[i];
            pos.putIfAbsent(x, new ArrayList<>());
            ArrayList<Integer> arr = pos.get(x);
            arr.add(i);

            if (arr.size() >= 3) {
                int n = arr.size();
                ans = Math.min(ans, arr.get(n - 1) - arr.get(n - 3));
            }
        }

        return ans == Integer.MAX_VALUE ? -1 : ans * 2;
    }
}