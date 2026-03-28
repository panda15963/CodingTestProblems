class Solution {
    public int solution(int[] money) {
        int n = money.length;

        // case 1: 첫 집 포함 (마지막 제외)
        int case1 = rob(money, 0, n - 2);

        // case 2: 첫 집 제외 (마지막 포함)
        int case2 = rob(money, 1, n - 1);

        return Math.max(case1, case2);
    }

    private int rob(int[] money, int start, int end) {
        int prev2 = 0; // dp[i-2]
        int prev1 = 0; // dp[i-1]

        for (int i = start; i <= end; i++) {
            int cur = Math.max(prev1, prev2 + money[i]);
            prev2 = prev1;
            prev1 = cur;
        }

        return prev1;
    }
}