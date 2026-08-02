class Solution {
    public int numDecodings(String s) {
        int n = s.length();
        Integer[] memo = new Integer[n];
        return dfs(s, 0, memo);
    }

    private int dfs(String s, int i, Integer[] memo) {
        int n = s.length();
        if (i == n) return 1;
        if (s.charAt(i) == '0') return 0;
        if (memo[i] != null) return memo[i];

        int ans = dfs(s, i + 1, memo);
        if (i + 1 < n) {
            int twoDigit = Integer.parseInt(s.substring(i, i + 2));
            if (twoDigit >= 10 && twoDigit <= 26) ans += dfs(s, i + 2, memo);
        }

        memo[i] = ans;
        return ans;
    }
}