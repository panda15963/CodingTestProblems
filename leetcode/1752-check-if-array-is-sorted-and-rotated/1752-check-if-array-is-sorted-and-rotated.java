class Solution {
    public boolean check(int[] nums) {
        int count = 0;
        int n = nums.length;
        
        for (int i = 0; i < n; i++) {
            // Use modulo to compare the last element with the first (circular check)
            if (nums[i] > nums[(i + 1) % n]) {
                count++;
            }
            
            // If more than one break is found, it's not a sorted rotated array
            if (count > 1) {
                return false;
            }
        }
        
        return true;
    }
}
