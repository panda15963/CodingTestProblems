class Solution {
    private final int MOD = 1337;

    public int superPow(int a, int[] b) {
        long result = 1;
        long base = a;

        for (int i = b.length - 1; i >= 0; i--) {
            result = result * quickPower(base, b[i]) % MOD;

            // base = a^(10^position)
            base = quickPower(base, 10);
        }

        return (int) result;
    }

    private long quickPower(long base, int exponent) {
        long result = 1;

        while (exponent > 0) {
            if ((exponent & 1) == 1) {
                result = result * base % MOD;
            }

            base = base * base % MOD;
            exponent >>= 1;
        }

        return result;
    }
}