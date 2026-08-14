class Solution {
    public int singleNumber(int[] nums) {
        int ones = 0;
        int twos = 0;

        for (int n : nums) {
            ones = (~twos) & (ones ^ n);
            twos = (~ones) & (twos ^ n);
        }

        return ones;
    }
}