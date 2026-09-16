import java.util.*;

class Solution {
    class BIT {
        int n;
        int[] tree;

        BIT(int n) {
            this.n = n;
            this.tree = new int[n + 1];
        }

        void increase(int i) {
            while (i <= n) {
                tree[i]++;
                i += i & -i;
            }
        }

        int get(int i) {
            int count = 0;

            while (i > 0) {
                count += tree[i];
                i -= i & -i;
            }

            return count;
        }
    }

    public List<Integer> countSmaller(int[] nums) {
        int n = nums.length;

        if (n == 0) {
            return new ArrayList<>();
        }

        int minValue = nums[0];
        int maxValue = nums[0];

        for (int num : nums) {
            minValue = Math.min(minValue, num);
            maxValue = Math.max(maxValue, num);
        }

        for (int i = 0; i < n; i++) {
            nums[i] = nums[i] - minValue + 1;
        }

        int maxIndex = maxValue - minValue + 1;

        BIT bit = new BIT(maxIndex);
        Integer[] ans = new Integer[n];

        for (int i = n - 1; i >= 0; i--) {
            ans[i] = bit.get(nums[i] - 1);
            bit.increase(nums[i]);
        }

        return Arrays.asList(ans);
    }
}