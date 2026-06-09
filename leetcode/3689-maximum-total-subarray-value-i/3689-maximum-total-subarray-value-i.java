class Solution {
    public long maxTotalValue(int[] nums, int k) {
        int mx = nums[0];
        int mn = nums[0];

        for (int x : nums) {
            if (x > mx) mx = x;
            if (x < mn) mn = x;
        }

        return (long) (mx - mn) * k;
    }
}