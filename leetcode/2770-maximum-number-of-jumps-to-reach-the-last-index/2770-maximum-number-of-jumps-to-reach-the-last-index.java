import java.util.Arrays;

public class Solution {
    public int maximumJumps(int[] nums, int target) {
        int n = nums.length;
        // dp[i] stores the maximum jumps to reach index i from index 0
        int[] dp = new int[n];
        
        // Initialize with -1 to indicate that the index is not yet reachable
        Arrays.fill(dp, -1);
        
        // Base case: 0 jumps to reach the starting index
        dp[0] = 0;
        
        for (int j = 1; j < n; j++) {
            for (int i = 0; i < j; i++) {
                // Check if index i is reachable and if the jump to j is valid
                if (dp[i] != -1 && Math.abs(nums[j] - nums[i]) <= target) {
                    dp[j] = Math.max(dp[j], dp[i] + 1);
                }
            }
        }
        
        return dp[n - 1];
    }
}
