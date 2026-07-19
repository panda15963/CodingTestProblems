/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    if (height.length === 0) {
        return 0;
    }

    let volume = 0;

    let left = 0;
    let right = height.length - 1;

    let leftMax = height[left];
    let rightMax = height[right];

    while (left < right) {
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);

        if (leftMax <= rightMax) {
            volume += leftMax - height[left];
            left++;
        } else {
            volume += rightMax - height[right];
            right--;
        }
    }

    return volume;
};