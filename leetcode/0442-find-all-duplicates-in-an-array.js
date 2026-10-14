var findDuplicates = function(nums) {
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        while (nums[i] !== nums[nums[i] - 1]) {
            const targetIndex = nums[i] - 1;
            const temp = nums[i];

            nums[i] = nums[targetIndex];
            nums[targetIndex] = temp;
        }
    }

    const result = [];

    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            result.push(nums[i]);
        }
    }

    return result;
};