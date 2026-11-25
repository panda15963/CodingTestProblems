import java.util.HashMap;
import java.util.Map;

class Solution {
    private static final long BASE1 = 911382323L;
    private static final long MOD1 = 1_000_000_007L;
    private static final long BASE2 = 972663749L;
    private static final long MOD2 = 1_000_000_009L;

    public int smallestUniqueSubarray(int[] nums) {
        int n = nums.length;
        long[] pow1 = new long[n + 1];
        long[] pow2 = new long[n + 1];
        long[] h1 = new long[n + 1];
        long[] h2 = new long[n + 1];

        pow1[0] = 1;
        pow2[0] = 1;

        for (int i = 0; i < n; i++) {
            long val = nums[i] + 1L;
            pow1[i + 1] = (pow1[i] * BASE1) % MOD1;
            pow2[i + 1] = (pow2[i] * BASE2) % MOD2;
            h1[i + 1] = (h1[i] * BASE1 + val) % MOD1;
            h2[i + 1] = (h2[i] * BASE2 + val) % MOD2;
        }

        int lo = 1, hi = n;
        int ans = n;

        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (hasUniqueSubarray(mid, n, pow1, pow2, h1, h2)) {
                ans = mid;
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }

        return ans;
    }

    private boolean hasUniqueSubarray(int len, int n, long[] pow1, long[] pow2, long[] h1, long[] h2) {
        Map<Long, Integer> counts = new HashMap<>(n - len + 1);

        for (int i = 0; i <= n - len; i++) {
            int j = i + len;
            long hash1 = (h1[j] - (h1[i] * pow1[len]) % MOD1 + MOD1) % MOD1;
            long hash2 = (h2[j] - (h2[i] * pow2[len]) % MOD2 + MOD2) % MOD2;
            
            // 두 해시 값을 하나의 64비트 long 키로 결합
            long combinedHash = (hash1 << 32) | hash2;
            counts.put(combinedHash, counts.getOrDefault(combinedHash, 0) + 1);
        }

        for (int count : counts.values()) {
            if (count == 1) {
                return true;
            }
        }
        return false;
    }
}
