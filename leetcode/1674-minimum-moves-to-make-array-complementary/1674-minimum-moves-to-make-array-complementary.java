class Solution {
    public int minMoves(int[] nums, int limit) {
        int n = nums.length;
        // 최대 합은 2 * limit이므로 2 * limit + 2 크기의 차분 배열 생성
        int[] diff = new int[2 * limit + 2];
        
        for (int i = 0; i < n / 2; i++) {
            int a = nums[i];
            int b = nums[n - 1 - i];
            
            // 1. 현재 쌍으로 만들 수 있는 최소/최대 합 (0번 이동)
            int minSum = Math.min(a, b) + 1;
            int maxSum = Math.max(a, b) + limit;
            int currentSum = a + b;
            
            // 기본: 모든 쌍은 2번 이동으로 목표 합을 만들 수 있음
            diff[2] += 2;
            diff[2 * limit + 1] -= 2;
            
            // 2. 1번 이동으로 가능한 범위: [minSum, maxSum]
            // 이 범위 내에서는 1번 이동(diff[minSum]~diff[maxSum])으로 변경 가능
            diff[minSum] -= 1;
            diff[maxSum + 1] += 1;
            
            // 3. 0번 이동(변경 불필요) 가능한 합: currentSum
            // 위에서 1번 이동 범위에 포함된 currentSum을 0번 이동으로 보정
            diff[currentSum] -= 1;
            diff[currentSum + 1] += 1;
        }
        
        int minMoves = n;
        int currentMoves = 0;
        // 차분 배열을 누적합으로 계산하여 최솟값 찾기
        for (int i = 2; i <= 2 * limit; i++) {
            currentMoves += diff[i];
            minMoves = Math.min(minMoves, currentMoves);
        }
        
        return minMoves;
    }
}
