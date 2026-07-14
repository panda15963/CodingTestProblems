import java.util.Arrays;

class Solution {
    private static final int MOD = 1_000_000_007;

    // mem[i][gcd1][gcd2]
    private int[][][] mem;
    private int[] nums;

    private int solve(int i, int g1, int g2) {
        // 모든 원소를 확인한 경우
        if (i == nums.length) {
            // 두 부분 수열의 GCD가 같은 경우
            return g1 > 0 && g1 == g2 ? 1 : 0;
        }

        // 이미 계산한 상태라면 메모이제이션된 값 반환
        if (mem[i][g1][g2] != -1) {
            return mem[i][g1][g2];
        }

        // 선택지 1: 현재 원소를 어느 부분 수열에도 포함하지 않음
        long ans = solve(i + 1, g1, g2);

        // 선택지 2: 현재 원소를 첫 번째 부분 수열에 포함
        int nextG1 = g1 == 0
                ? nums[i]
                : gcd(g1, nums[i]);

        ans = (ans + solve(i + 1, nextG1, g2)) % MOD;

        // 선택지 3: 현재 원소를 두 번째 부분 수열에 포함
        int nextG2 = g2 == 0
                ? nums[i]
                : gcd(g2, nums[i]);

        ans = (ans + solve(i + 1, g1, nextG2)) % MOD;

        return mem[i][g1][g2] = (int) ans;
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }

        return a;
    }

    public int subsequencePairCount(int[] nums) {
        this.nums = nums;

        mem = new int[nums.length][201][201];

        // 메모이제이션 배열 초기화
        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j <= 200; j++) {
                Arrays.fill(mem[i][j], -1);
            }
        }

        return solve(0, 0, 0);
    }
}