class Solution {
    public int arrangeCoins(int n) {
        int ans = 1;

        while (true) {
            n -= ans;
            if (n <= ans) break;
            ans++;
        }

        return ans;
    }
}