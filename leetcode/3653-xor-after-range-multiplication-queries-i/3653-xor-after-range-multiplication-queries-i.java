class Solution {
    private static final int MOD = 1000000007;
    public int xorAfterQueries(int[] nums, int[][] queries) {
        for (int[] query : queries) {
            int left = query[0], right = query[1], step = query[2], value = query[3];
            for (int index = left; index <= right; index += step) {
                nums[index] = (int) ((long) nums[index] * value % MOD);
            }
        }
        int answer = 0;
        for (int num : nums) {
            answer ^= num;
        }
        return answer;
    }
}