class Solution {
    public int jump(int[] nums) {
        int maxIndex = 0;
        int currentEnd = 0;
        int answer = 0;

        for (int i = 0; i < nums.length; i++) {
            maxIndex = Math.max(maxIndex, i + nums[i]);

            if (currentEnd == i && i != nums.length - 1) {
                answer++;
                currentEnd = maxIndex;
            }
        }

        return answer;
    }
}