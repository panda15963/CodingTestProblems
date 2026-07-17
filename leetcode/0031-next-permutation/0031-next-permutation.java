class Solution {
public void nextPermutation(int[] nums) {
    int len = nums.length;
    if(nums == null || len <= 1) return;
    int i = len - 2;
    while(i >= 0 && nums[i] >= nums[i + 1]) i--; // 1. Find first decreasing element
    if(i >= 0) {                                 // If not entirely descending
        int j = len - 1;                         // Start from the end
        while(nums[j] <= nums[i]) j--;           // 2. Find number just larger then [i]
        swap(nums, i, j);                        // 3. Swap i and j
    }
    reverse(nums, i + 1, len - 1);     // 4. Reverse the descending sequence
}

public void swap(int[] nums, int i, int j) {
    int tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
}

public void reverse(int[] nums, int i, int j) {
    while(i < j) swap(nums, i++, j--);
}
}