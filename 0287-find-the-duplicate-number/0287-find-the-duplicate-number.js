/**
 * problem : https://leetcode.com/problems/find-the-duplicate-number/
 * time complexity : O(N)
 * algorithm : Floyd's cycle detection
 */

function findDuplicate(nums) {
    let slow = nums[0];
    let fast = nums[0];

    // Cycle detection
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);

    // Find cycle entrance
    slow = nums[0];

    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow;
}