import java.util.BitSet;
import java.util.HashSet;
import java.util.Set;

class Solution {
    public int uniqueXorTriplets(int[] nums) {
        int n = nums.length;

        if (n == 1) {
            return 1;
        }

        Set<Integer> pairXor = new HashSet<>();

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                pairXor.add(nums[i] ^ nums[j]);
            }
        }

        BitSet ans = new BitSet();

        for (int x : pairXor) {
            for (int num : nums) {
                ans.set(x ^ num);
            }
        }

        return ans.cardinality();
    }
}