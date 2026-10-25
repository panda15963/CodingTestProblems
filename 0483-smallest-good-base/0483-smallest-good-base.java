class Solution {
    public String smallestGoodBase(String n) {
        long target = Long.parseLong(n);

        // Try different digit counts from largest to smallest
        for (int numTerms = 63; numTerms >= 2; numTerms--) {
            long base = findBase(numTerms, target);
            if (base != -1) {
                return String.valueOf(base);
            }
        }

        // Fallback: m = 1 case, n = 1 + (n-1)
        return String.valueOf(target - 1);
    }

    /**
     * Binary search template: find the smallest base where sum >= target,
     * then check if it's an exact match.
     */
    private long findBase(int numTerms, long target) {
        long left = 2;
        long right = target - 1;
        long firstTrueIndex = -1;

        while (left <= right) {
            long mid = left + (right - left) / 2;
            if (feasible(mid, numTerms, target)) {
                firstTrueIndex = mid;
                right = mid - 1;  // Search for smaller base
            } else {
                left = mid + 1;
            }
        }

        // Check if we found an exact match
        if (firstTrueIndex != -1 && calculateSum(firstTrueIndex, numTerms) == target) {
            return firstTrueIndex;
        }
        return -1;
    }

    private boolean feasible(long base, int numTerms, long target) {
        return calculateSum(base, numTerms) >= target;
    }

    /**
     * Calculate: 1 + base + base^2 + ... + base^numTerms
     * Returns Long.MAX_VALUE on overflow.
     */
    private long calculateSum(long base, int numTerms) {
        long power = 1;
        long sum = 1;

        for (int i = 0; i < numTerms; i++) {
            // Check for overflow
            if (power > Long.MAX_VALUE / base) {
                return Long.MAX_VALUE;
            }
            power *= base;
            if (sum > Long.MAX_VALUE - power) {
                return Long.MAX_VALUE;
            }
            sum += power;
        }

        return sum;
    }
}
