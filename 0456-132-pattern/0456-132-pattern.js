var find132pattern = function(nums) {
    let maxMiddleValue = -Infinity;
    const stack = [];

    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] < maxMiddleValue) {
            return true;
        }

        while (
            stack.length > 0 &&
            stack[stack.length - 1] < nums[i]
        ) {
            maxMiddleValue = stack.pop();
        }

        stack.push(nums[i]);
    }

    return false;
};