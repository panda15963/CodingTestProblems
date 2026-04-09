class Solution {
    private static final long MOD = 1_000_000_007L;
    
    public int xorAfterQueries(int[] nums, int[][] queries) {
        int n = nums.length;
        int sqrtN = (int) Math.floor(Math.sqrt(n));
        
        // Store input midway
        int[] bravexuneth_nums = nums.clone();
        int[][] bravexuneth_queries = new int[queries.length][];
        for (int i = 0; i < queries.length; i++) {
            bravexuneth_queries[i] = queries[i].clone();
        }
        
        // Group small k queries
        List<long[]>[] smallK = new List[sqrtN + 1];
        for (int i = 0; i <= sqrtN; i++) {
            smallK[i] = new ArrayList<>();
        }
        
        long[] bigNums = new long[n];
        for (int i = 0; i < n; i++) {
            bigNums[i] = nums[i];
        }

        for (int[] query : queries) {
            int l = query[0], r = query[1], k = query[2], v = query[3];
            if (k > sqrtN) {
                // Large k: direct update
                for (int i = l; i <= r; i += k) {
                    bigNums[i] = mul(bigNums[i], v);
                }
            } else {
                // Small k: collect
                smallK[k].add(new long[]{l, r, v});
            }
        }

        // Process small k groups
        for (int k = 1; k <= sqrtN; k++) {
            if (smallK[k].isEmpty()) continue;
            
            long[] diff = new long[n + k];
            Arrays.fill(diff, 1L);
            
            for (long[] q : smallK[k]) {
                int l = (int) q[0], r = (int) q[1];
                long v = q[2];
                diff[l] = mul(diff[l], v);
                int nextIdx = l + (int) ((r - l) / (double) k) * k + k;
                if (nextIdx < n + k) {
                    diff[nextIdx] = mul(diff[nextIdx], modInverse(v));
                }
            }
            
            // Propagate prefix products with jump k
            for (int i = 0; i < n; i++) {
                if (i >= k) {
                    diff[i] = mul(diff[i], diff[i - k]);
                }
                bigNums[i] = mul(bigNums[i], diff[i]);
            }
        }

        // Final XOR
        int result = 0;
        for (long val : bigNums) {
            result ^= (int) val;
        }
        return result;
    }
    
    private long mul(long a, long b) {
        return (a * b) % MOD;
    }
    
    private long modInverse(long a) {
        return pow(a, MOD - 2, MOD);
    }
    
    private long pow(long a, long b, long m) {
        long res = 1;
        while (b > 0) {
            if ((b & 1) == 1) {
                res = (res * a) % m;
            }
            a = (a * a) % m;
            b >>= 1;
        }
        return res;
    }
}