class Solution {
    public int minimumDistance(int[] nums) {
        int n = nums.length;
        int minDistance = Integer.MAX_VALUE;
        boolean found = false;

        // 3개의 중첩 반복문으로 3개의 인덱스 조합을 찾음 (Brute Force)
        for (int i = 0; i < n - 2; i++) {
            for (int j = i + 1; j < n - 1; j++) {
                // 첫 두 요소가 같지 않으면 건너뜀 (최적화)
                if (nums[i] != nums[j]) continue;
                
                for (int k = j + 1; k < n; k++) {
                    // 세 요소가 같은지 확인
                    if (nums[i] == nums[k]) {
                        // 거리 계산: |i-j| + |j-k| + |k-i|
                        int currentDistance = Math.abs(i - j) + Math.abs(j - k) + Math.abs(k - i);
                        minDistance = Math.min(minDistance, currentDistance);
                        found = true;
                    }
                }
            }
        }

        return found ? minDistance : -1;
    }
}
