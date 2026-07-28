class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;

        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false; // 이 인덱스에는 물리적으로 도달할 수 없다
            maxReach = Math.max(maxReach, i + nums[i]); // → 현재 위치를 이용해 도달 범위를 확장한다
        }
        return true;
    }
}