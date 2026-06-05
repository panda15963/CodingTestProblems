import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

class Solution {
    public long totalWaviness(long num1, long num2) {
        BigInteger ans2 = countWavinessUpTo(BigInteger.valueOf(num2))[1];
        BigInteger ans1 = countWavinessUpTo(BigInteger.valueOf(num1).subtract(BigInteger.ONE))[1];
        return ans2.subtract(ans1).longValue();
    }

    private BigInteger[] countWavinessUpTo(BigInteger n) {
        if (n.compareTo(BigInteger.ZERO) <= 0) {
            return new BigInteger[]{BigInteger.ZERO, BigInteger.ZERO};
        }

        String s = n.toString();
        int len = s.length();
        Map<String, BigInteger[]> memo = new HashMap<>();

        return dp(0, -1, 0, false, false, s, len, memo);
    }

    private BigInteger[] dp(
            int idx,
            int lastDigit,
            int lastCmp,
            boolean isLess,
            boolean isStarted,
            String s,
            int len,
            Map<String, BigInteger[]> memo
    ) {
        if (idx == len) {
            return new BigInteger[]{isStarted ? BigInteger.ONE : BigInteger.ZERO, BigInteger.ZERO};
        }

        String key = idx + "," + lastDigit + "," + lastCmp + "," + isLess + "," + isStarted;
        if (memo.containsKey(key)) return memo.get(key);

        BigInteger totalCount = BigInteger.ZERO;
        BigInteger totalWavinessSum = BigInteger.ZERO;

        int limit = isLess ? 9 : (s.charAt(idx) - '0');

        for (int d = 0; d <= limit; d++) {
            boolean nextIsLess = isLess || (d < limit);

            if (!isStarted) {
                if (d == 0) {
                    BigInteger[] res = dp(idx + 1, -1, 0, nextIsLess, false, s, len, memo);
                    totalCount = totalCount.add(res[0]);
                    totalWavinessSum = totalWavinessSum.add(res[1]);
                } else {
                    BigInteger[] res = dp(idx + 1, d, 0, nextIsLess, true, s, len, memo);
                    totalCount = totalCount.add(res[0]);
                    totalWavinessSum = totalWavinessSum.add(res[1]);
                }
            } else {
                int currentCmp = 0;
                if (d > lastDigit) currentCmp = 1;
                else if (d < lastDigit) currentCmp = -1;

                BigInteger deltaWaviness = BigInteger.ZERO;
                if (lastCmp != 0 && currentCmp != 0 && currentCmp == -lastCmp) {
                    deltaWaviness = BigInteger.ONE;
                }

                BigInteger[] res = dp(idx + 1, d, currentCmp, nextIsLess, true, s, len, memo);
                totalCount = totalCount.add(res[0]);
                totalWavinessSum = totalWavinessSum.add(res[1]).add(deltaWaviness.multiply(res[0]));
            }
        }

        BigInteger[] result = new BigInteger[]{totalCount, totalWavinessSum};
        memo.put(key, result);
        return result;
    }
}