function rob(nums) {
    const maxArraySize = nums.length;

    const maxNum = new Array(maxArraySize);

    maxNum[0] = nums[0];

    // 집이 1개인 경우
    if (nums.length < 2) {
        return maxNum[0];
    }

    maxNum[1] = Math.max(nums[0], nums[1]);

    // 집이 2개인 경우
    if (nums.length < 3) {
        return Math.max(maxNum[0], maxNum[1]);
    }

    for (let i = 2; i < nums.length; i++) {
        maxNum[i] = Math.max(
            maxNum[i - 2] + nums[i],
            maxNum[i - 1]
        );
    }

    return maxNum[maxArraySize - 1];
}